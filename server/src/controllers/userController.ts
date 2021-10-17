import { Response, Request } from 'express';
import argon2 from 'argon2';
import { registerValidation } from '../validation/registerUserValidation';
import { createUser } from '../database/createUser';
import { sendVerificationEmail } from '../services/sendVerificationEmail';
import { verifyUserValidation } from '../Validation/verifyUserValidation';
import { retrieveVerificationCode, verifyUser } from '../database/verifyUser';
import { retrieveUserByID } from '../database/retrieveUser';
import {
	loginFieldValidation,
	loginAccountValidation
} from '../Validation/loginUserValidation';
import {
	hasValidAuthCode,
	deleteAuthCode
} from '../database/twoFactorAuthenication';

export const userController = {
	verify: async (req: Request, res: Response) => {
		const verificationCode = req.body.verificationCode;
		let error = await verifyUserValidation(req.ctx!, {
			verificationCode
		});

		if (error) {
			res.json({ fieldError: error });
		}

		const code = await retrieveVerificationCode(req.ctx!, verificationCode);
		error = await verifyUser(req.ctx!, code!);

		if (error) {
			res.json({ fieldError: error });
		}

		const user = await retrieveUserByID(req.ctx!, code!.UseruserID);
		req.session.user = user;

		return res.json({ message: 'Account has been verified!' });
	},

	login: async (req: Request, res: Response) => {
		const email = req.body.email;
		const password = req.body.password;
		const error = await loginFieldValidation({ email, password });

		// FieldError incase no client validation
		if (error) {
			res.json({ fieldError: error });
			return;
		}
		const user = await loginAccountValidation(req.ctx!, {
			email,
			password
		});

		// Form Error
		if (!user) {
			res.json({
				formError: {
					message: 'Please ensure your email and password is correct.'
				}
			});
			return;
		}

		if (await hasValidAuthCode(req.ctx!, user)) {
			deleteAuthCode(req.ctx!, user);
		}

		sendVerificationEmail(req.ctx!, user);
		res.status(200).json({ user: user });
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
	},

	logout: async (req: Request, res: Response) => {
		req.session.user = undefined;

		res.status(200).send({ message: 'Logged out successfully' });
	}
};
