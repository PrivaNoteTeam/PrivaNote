import { Response, Request } from 'express';
import { NotebookItem } from '../../types';

export const createNotebook = async (req: Request, __: Response) => {
	const notebook: NotebookItem = req.body.notebook;
	notebook;
};
