import { Request, Response } from 'express';
import { db } from '../../database/sync';

export const deleteFile = async (req: Request, res: Response) => {
    const fileId = req.body.fileId;
    const response = await db.deleteFile(req.ctx!, fileId);

    response 
        ? res.status(200).send(`Deleted file ${fileId}`)
        : res.status(400).send('An error occurred when deleting file.');
}