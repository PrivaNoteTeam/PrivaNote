import {
	createTestAccount,
	createTransport,
	getTestMessageUrl
} from 'nodemailer';

export async function sendVerificationEmail(email: string) {
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

	let code = 'verify';

	const info = await transporter.sendMail({
		from: '"PrivaNote 📕" <do.notreply@privanote.com>',
		to: email,
		subject: 'Verify your email',
		text: `Your verification code is: ${code}`,
		html: `<b>Your verification code is ${code}</b>`
	});

	console.log('Message sent: ' + info.messageId);
	console.log('Email link: ' + getTestMessageUrl(info));
}
