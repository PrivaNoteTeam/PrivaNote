import { Response, Request } from 'express';
import {
	loginFieldValidation,
	loginAccountValidation
} from '../../validation/loginUserValidation';
import {
	hasValidAuthCode,
	deleteAuthCode
} from '../../database/twoFactorAuthenication';
import { send2FAEmail } from '../../services/send2FAEmail';

export const login = async (req: Request, res: Response) => {
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

    send2FAEmail(req.ctx!, user);

    res.status(200).json({ success: true });
}