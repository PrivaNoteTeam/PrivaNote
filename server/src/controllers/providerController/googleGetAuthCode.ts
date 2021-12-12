import { Request, Response } from 'express';

export const googleGetAuthCode = async (req: Request, res: Response) => {
	if (!req.query.code) return res.status(400).send('Invalid request');

	res.redirect(
		`privanote://google-drive/auth?authorizationCode=${req.query.code}`
	);

	return;
};
