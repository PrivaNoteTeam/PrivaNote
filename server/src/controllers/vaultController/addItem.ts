import { Request, Response } from 'express';
import { db } from '../../database/sync';
import { Item } from '../../types';

export const addItem = async (req: Request, res: Response) => {
	// if (!req.session.user) {
	//     return res.status(400).send(`Not authenticated to Vault.`);
	// }

	const item: Item = req.body.item;
	const notebookStructure: Item = req.body.notebookStructure;

	let response;
	if (item.id && item.content) {
		response = await db.addItem(req.ctx!, item);
	}
	await db.updateNotebookStructure(req.ctx!, notebookStructure);

	response
		? res.status(200).send(`Item ${item.id} was created successfully.`)
		: res.status(400).send(`Item ${item.id} could not be created.`);

	return;
};
