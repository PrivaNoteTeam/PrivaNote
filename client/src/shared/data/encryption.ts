import { pbkdf2Sync, createCipheriv, createDecipheriv } from 'crypto';

export const generateEncryptionKey = (password: string) => {
	if (process.env.ENCRYPTION_SALT) {
		// used to be process.env.salt thing
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

export const encryptText = (content: string) => {
	if (process.env.ENCRYPTION_KEY && process.env.IV) {
		const cipher = createCipheriv(
			'aes-256-cbc',
			process.env.ENCRYPTION_KEY.slice(0, 32),
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

export const decryptText = (content: string) => {
	if (process.env.ENCRYPTION_KEY && process.env.IV) {
		const decipher = createDecipheriv(
			'aes-256-cbc',
			process.env.ENCRYPTION_KEY.slice(0, 32),
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

export const encryptFile = (content: Buffer) => {
	if (process.env.ENCRYPTION_KEY && process.env.IV) {
		const cipher = createCipheriv(
			'aes-256-cbc',
			process.env.ENCRYPTION_KEY.slice(0, 32),
			process.env.IV
		);
		const encrypted = Buffer.concat([
			cipher.update(content),
			cipher.final()
		]);
		return encrypted.toString('base64');
	} else {
		throw Error(
			'Encryption Error: Encrytion key and initialization vector have not been defined'
		);
	}
};

export const decryptFile = (content: string) => {
	if (process.env.ENCRYPTION_KEY && process.env.IV) {
		const decipher = createDecipheriv(
			'aes-256-cbc',
			process.env.ENCRYPTION_KEY.slice(0, 32),
			process.env.IV
		);
		const buffer = Buffer.from(content, 'base64');
		const decrypted = Buffer.concat([
			decipher.update(buffer),
			decipher.final()
		]);
		return decrypted;
	} else {
		throw Error(
			'Decryption Error: Encrytion key and initialization vector have not been defined'
		);
	}
};
