import { Request, Response } from 'express';
import { db } from 'src/database/sync';

export const downloadFile = async (req: Request, res: Response) => {
    const fileId: string = req.body.fileId;
    
    const response = await db.getFile(req.ctx!, fileId);

    response 
        ? res.status(200).json({
            content: response.content
        })
        : res.status(400).send(`File ${fileId} could not be downloaded.`);
}