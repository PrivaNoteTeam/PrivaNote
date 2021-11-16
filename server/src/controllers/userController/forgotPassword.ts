import { Request, Response } from 'express';
import { getUserByEmail } from '../../database/getUserByEmail';
import { sendForgotPasswordEmail } from '../../services/sendForgotPasswordEmail';

export const forgotPassword = async (req: Request, res: Response) => {
	const email = req.body.email;

	const user = await getUserByEmail(req.ctx!, email);

	if (!user) {
		res.status(200).json({
			field: 'email',
			message: 'no account by that email'
		});

		return;
	}

	sendForgotPasswordEmail(req.ctx!, user);

	res.status(200).json({ success: true });
};
