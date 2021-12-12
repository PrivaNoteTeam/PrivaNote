import { Response, Request } from 'express';
import { verifyUserValidation } from '../../validation/verifyUserValidation';
import {
	retrieveVerificationCode,
	verifyUser
} from '../../database/verifyUser';
import { retrieveUserByID } from '../../database/retrieveUser';

export const verify = async (req: Request, res: Response) => {
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

	return res.json({ user: user });
};
