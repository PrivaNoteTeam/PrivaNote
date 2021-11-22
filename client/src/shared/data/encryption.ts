import { pbkdf2Sync, createCipheriv, createDecipheriv } from 'crypto';

export const generateEncryptionKey = (password: string) => {
	if (process.env.ENCRYPTION_SALT) {
		return pbkdf2Sync(
			password,
			process.env.ENCRYPTION_SALT,
			100000,
			512,
			'sha512'
		).toString('hex');
	} else {
		throw Error('Encryption Key variables have not been configured');
	}
};

export const encrypt = (content: string) => {
	if (process.env.ENCRYPTION_KEY && process.env.IV) {
		const cipher = createCipheriv(
			'aes-256-cbc',
			process.env.ENCRYPTION_KEY,
			process.env.IV
		);
		let encrypted = cipher.update(content, 'utf-8', 'base64');
		encrypted += cipher.final('base64');
		return encrypted;
	} else {
		throw Error(
			'Encryption Error: Encrytion key and initialization vector have not been defined'
		);
	}
};

export const decrypt = (content: string) => {
	if (process.env.ENCRYPTION_KEY && process.env.IV) {
		const decipher = createDecipheriv(
			'aes-256-cbc',
			process.env.ENCRYPTION_KEY,
			process.env.IV
		);
		let decrypted = decipher.update(content, 'base64', 'utf-8');
		decrypted += decipher.final('utf-8');
		return decrypted;
	} else {
		throw Error(
			'Decryption Error: Encrytion key and initialization vector have not been defined'
		);
	}
};
