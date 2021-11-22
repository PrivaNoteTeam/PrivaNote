import { Response, Request, response } from 'express';
import { db } from '../../database/sync';

export const deleteFolder = async (req: Request, res: Response) => {
    const folderId = req.body.folderId;
    const response = await db.deleteFolder(req.ctx!, folderId);

    response
        ? res.status(200).send(`Deleted folder ${folderId}.`)
        : res.status(400).send(`Ann error occurred when deleting file.`)
}