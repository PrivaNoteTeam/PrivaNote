import { Response, Request } from 'express';
import argon2 from 'argon2';
import { registerValidation } from '../validation/registerUserValidation';
import { createUser } from '../database/createUser';

export const userController = {
	register: async (req: Request, res: Response) => {
		const email = req.body.email;
		const password = req.body.password;
		const hashedPassword = await argon2.hash(password);

		const error = await registerValidation(req.ctx!, {
			email,
			password: hashedPassword
		});

		if (error) {
			res.status(409).json(error);
			return;
		}

		const user = await createUser(req.ctx!, {
			email,
			password: hashedPassword
		});

		if (!user) {
			res.status(400).json({
				message: 'user could not be created'
			});
		}

		res.status(200).json(user);
	}
};
