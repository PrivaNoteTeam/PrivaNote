import { Request, Response } from 'express';
import { db } from '../../database/sync';
import {Item} from '../../types';

export const deleteItem = async (req: Request, res: Response) => {
    const itemId: string = req.body.itemId;
    const notebookStructure: Item = req.body.notebookStructure;

    const response = await db.deleteItem(req.ctx!, itemId);
    db.updateNotebookStructure(req.ctx!, notebookStructure);

    response 
        ? res.status(200).send(`Deleted file ${itemId}`)
        : res.status(400).send('An error occurred when deleting file.');
}