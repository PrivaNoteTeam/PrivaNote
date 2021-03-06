import {
	// createTestAccount,
	createTransport,
	getTestMessageUrl
} from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { generateCode } from './generateCode';
import { Context, User } from '../types';

export async function sendVerificationEmail(ctx: Context, user: User) {
	const transporter = createTransport(
		smtpTransport({
			service: 'gmail',
			auth: {
				user: process.env.PRIVANOTE_EMAIL,
				pass: process.env.PRIVANOTE_PASS
			}
		})
	);

	generateCode(ctx, user)
		.then((code) => {
			transporter
				.sendMail({
					from: '"PrivaNote 📕" <do.notreply@privanote.com>',
					to: user.email,
					subject: 'Verify your email',
					text: getEmailTextContent(code),
					html: getEmailHtmlContent(code)
				})
				.then((info) => {
					// DO NOT REMOVE THESE CONSOLE LOGS
					console.log('Message sent: ' + info.messageId);
					console.log('Email link: ' + getTestMessageUrl(info));
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
}

const getEmailHtmlContent = (code: string) => `
	<p>Hi,</p>
	<br/>
	<p>Complete the registration of your PrivaNote account.</p>
	<p>Here's your verification code:</p>
	<b style='text-align:center'>${code}</b>
	<p>This code expires in 2 hours.</p>
	<b>What to do if this wasn't you</b>
	<p>If this wasn't you then <b>do not click the link</b>.</p>
	<br/>
	<p>Sincerely,</p>
	<p>PrivaNote Team</p>
`;

const getEmailTextContent = (code: string) => `
	Hi,

	Complete the registration of your PrivaNote account
	Here's your verification code:

	${code}

	This code expires in 2 hours.

	What to do if this wasn't you
	If this wasn't you then DO NOT click the link.	

	Sincerely,

	PrivaNote Team
`;
