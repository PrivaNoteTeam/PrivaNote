import { Response, Request } from 'express';
import { Item } from '../../types';
import { db } from '../../database/sync';

export const createNotebook = async (req: Request, __: Response) => {
	console.log(req.body.notebookStructure);

	const notebookStructure: Item[] = req.body.notebookStructure;
	
	notebookStructure.forEach((item) => {
		db.addItem(req.ctx!, item);	
	});
};
