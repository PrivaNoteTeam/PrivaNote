import {
	createTestAccount,
	createTransport,
	getTestMessageUrl
} from 'nodemailer';
import { createVerificationCode } from '../database/createVerifationCode';
import { Context, User } from '../types';
import { customAlphabet } from 'nanoid';

export async function sendVerificationEmail(ctx: Context, user: User) {
	const privaNoteTestAccount = await createTestAccount();

	const transporter = createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: privaNoteTestAccount.user,
			pass: privaNoteTestAccount.pass
		}
	});

	let code = await generateVerficationCode(ctx, user);

	const info = await transporter.sendMail({
		from: '"PrivaNote 📕" <do.notreply@privanote.com>',
		to: user.email,
		subject: 'Verify your email',
		text: `Your verification code is: ${code}`,
		html: `<b>Your verification code is ${code}</b>`
	});

	// DO NOT REMOVE THESE CONSOLE LOGS
	console.log('Message sent: ' + info.messageId);
	console.log('Email link: ' + getTestMessageUrl(info));
}

export async function generateVerficationCode(ctx: Context, user: User) {
	const verificationCode = customAlphabet('1234567890abcdef', 6)();
	await createVerificationCode(ctx, verificationCode, user);

	return verificationCode;
}
