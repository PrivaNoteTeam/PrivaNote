import {
	createTestAccount,
	createTransport,
	getTestMessageUrl
} from 'nodemailer';
import { generateCode } from './generateCode';
import { Context, User } from '../types';

export async function send2FAEmail(ctx: Context, user: User) {
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

	const code = await generateCode(ctx, user);

	const info = await transporter.sendMail({
		from: '"PrivaNote 📕" <do.notreply@privanote.com>',
		to: user.email,
		subject: 'Your two-factor authentication code',
		text: getEmailTextContent(code),
		html: getEmailHtmlContent(code)
	});

	// DO NOT REMOVE THESE CONSOLE LOGS
	console.log('Message sent: ' + info.messageId);
	console.log('Email link: ' + getTestMessageUrl(info));
}

const getEmailHtmlContent = (code: string) => `
	<p>Hi,</p>
    <br/>
	<p>You have attempted to log into your PrivaNote account.</p>
	<p>Here's your authentication code:</p>
	<b style='text-align:center'>${code}</b>
	<p>This code expires in 2 hours.</p>
	<b>What to do if this wasn't you</b>
	<p>This email was sent automatically by someone trying to log into your PrivaNote account. If this wasn't you, someone else may be trying to gain access to your account.</p>
	<p>Please contact us immediately by email so we can ensure your data is safe.</p>
    <br/>
	<p>Sincerely,</p>
	<p>PrivaNote Team</p>
`;

const getEmailTextContent = (code: string) => `
	Hi,

	You have attempted to log into your PrivaNote account.
	Here's your authentication code:

	${code}

	This code expires in 2 hours.

	What to do if this wasn't you
	This email was sent automatically by someone trying to log into your PrivaNote account. If this wasn't you, someone else may be trying to gain access to your account.
	
	Please contact us immediately by email so we can ensure your data is safe.

	Sincerely,

	PrivaNote Team
`;
