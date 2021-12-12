import { Request, Response } from 'express';
import { db } from '../../database/sync';
import { Item } from '../../types';

export const updateItem = async (req: Request, res: Response) => {
    const item: Item = req.body.item;
    const notebookStructure: Item = req.body.notebookStructure;

    const response = await db.updateItem(
        req.ctx!, 
        item
    );

    await db.updateNotebookStructure(req.ctx!, notebookStructure);

    response
        ? res.status(200).send(`File ${item.id} was updated successfully.`)
        : res.status(400).send(`File ${item.id} could not be updated.`);
}