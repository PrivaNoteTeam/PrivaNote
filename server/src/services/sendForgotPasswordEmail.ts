import {
	createTestAccount,
	createTransport,
	getTestMessageUrl
} from 'nodemailer';
import { generateCode } from './generateCode';
import { Context, User } from '../types';

export async function sendForgotPasswordEmail(ctx: Context, user: User) {
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
		subject: 'Forgot your password?',
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
    <p>We received a request to reset the password of your PrivaNote account.</p>
    <br/>
    <p>To reset your password, click on the link below</p>
    <a href='privanote://reset-password/${code}'>Reset password</a>
    <br/>
    <b>Did not request a password reset?</b>
    <p>If you did not request a password reset then do not click the link.</p>
    <p>Contact the PrivaNote Team immediately.</p>
    <br/>
    <p>Sincerely,</p>
    <p>PrivaNote Team</p>
`;

const getEmailTextContent = (code: string) => `
    Hi,
    
    We received a request to reset the password of your PrivaNote account.
    
    To reset your password, copy and paste using the link below
    http://localhost:8080/api/reset-password/${code}
    
    Did not request a password reset?
    If you did not request a password reset then do not click the link.
    Contact the PrivaNote Team immediately.
    
    Sincerely,

    PrivaNote Team
`;
