import { Response, Request } from 'express';
import argon2 from 'argon2';
import { registerValidation } from '../validation/registerUserValidation';
import { createUser } from '../database/createUser';
import { sendVerificationEmail } from '../services/sendVerificationEmail';

export const userController = {
	register: async (req: Request, res: Response) => {
		const email = req.body.email;
		const password = req.body.password;
		const hashedPassword = await argon2.hash(password);

		const error = await registerValidation(req.ctx!, {
			email,
			password: hashedPassword
		});
		// FieldError
		if (error) {
			res.json({ fieldError: error });
			return;
		}

		const user = await createUser(req.ctx!, {
			email,
			password: hashedPassword
		});
		// FormError
		if (!user) {
			res.json({
				formError: {
					message: 'user could not be created'
				}
			});

			return;
		}

		sendVerificationEmail(req.ctx!, user);

		// User
		res.status(200).json({ user: user });
	}
};
