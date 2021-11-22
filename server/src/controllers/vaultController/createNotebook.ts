import { Response, Request } from 'express';
import { NotebookItem } from '../../types';
import { Notebook } from '@prisma/client';

export const createNotebook = async (req: Request, __: Response) => {
	const notebook: NotebookItem = req.body.notebook;
	
	
};
