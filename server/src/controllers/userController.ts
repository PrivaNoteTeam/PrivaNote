import { Response, Request } from 'express';
import argon2 from 'argon2';
import { registerValidation } from '../validation/registerUserValidation';
import { createUser } from '../database/createUser';
import { sendVerificationEmail } from '../services/sendVerificationEmail';
import { verifyUserValidation } from '../Validation/verifyUserValidation';
import { verifyUser } from '../database/verifyUser';
import { loginValidation } from '../Validation/loginUserValidation';

export const userController = {
	verify: async (req: Request, res: Response) => {
		const verificationCode = req.body.verificationCode;
		let error = await verifyUserValidation(req.ctx!, {
			verificationCode
		});

		if (error) {
			res.json({ fieldError: error });
		}

		error = await verifyUser(req.ctx!, verificationCode);

		if (error) {
			res.json({ fieldError: error });
		}

		return res.json({ message: 'Account has been verified!' });
	},

	login: async (req: Request, res: Response) => {
		const email = req.body.email;
		const password = req.body.password;
		// const hashedPassword = await argon2.hash(password);
		// console.log(email, password, hashedPassword);

		const error = await loginValidation(req.ctx!, {
			email,
			password
		});

		if (error) {
			res.json({ fieldError: error });
			return;
		}
		res.status(500).send();
	},

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
