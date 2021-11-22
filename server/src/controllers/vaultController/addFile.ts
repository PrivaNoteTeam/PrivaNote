import { Page } from '.prisma/client';
import { Request, Response } from 'express';
import { NotebookItem } from 'src/types';
import { db } from '../../database/sync';

// Page can include attachments
const mapFileToModel = (file: NotebookItem, parentId: string): Page => {
    return {
        name: file.name,
        content: file.content!,
        createdAt: new Date(file.dateCreated),
        updatedAt: new Date(file.lastModified),
        pageID: file.id as unknown as number,
        FolderfolderID: parentId as unknown as number // FIX!
    };
}

export const addFile = async (req: Request, res: Response) => {
    const file: NotebookItem = req.body.file;
    const parentId = req.body.parentId;

    const response = await db.addFile(
        req.ctx!, 
        mapFileToModel(file, parentId)
    );

    response 
    ? res.status(200).send(`File ${file.id} was created successfully.`)
    : res.status(400).send(`File ${file.id} could not be created.`);
}