import { Response, Request } from 'express';

export const user = async (req: Request, res: Response) => {
	if (req.session.user) {
		res.json({ message: 'no authenticated user' });

		return;
	}

	res.json({ user: req.session.user });

	return;
};
