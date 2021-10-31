import { Response, Request } from 'express';

export const logout = (req: Request, res: Response) => {
	req.session.user = undefined;

	res.status(200).send({ message: 'Logged out successfully' });
};
