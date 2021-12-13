import { Request, Response } from 'express';
import { db } from '../../database/sync';

export const downloadItem = async (req: Request, res: Response) => {
	const itemId: string = req.query.itemId as unknown as string;

	const response = await db.downloadItem(req.ctx!, itemId);

	response
		? res.status(200).json({
				content: response.content
		  })
		: res.status(400).send(`Item ${itemId} could not be downloaded.`);
};
