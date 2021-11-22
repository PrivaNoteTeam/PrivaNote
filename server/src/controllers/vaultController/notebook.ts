import { Response, Request } from 'express';

export const createNotebook = async (req: Request, res: Response) => {
	if (true) {
		console.log(req.session.user);
	} else {
		console.log(res);
	}
};
