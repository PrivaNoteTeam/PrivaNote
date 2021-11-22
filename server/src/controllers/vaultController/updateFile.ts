import { Request, Response } from 'express';
import { db } from 'src/database/sync';
import { NotebookItem } from '../../types';
import { Page } from '@prisma/client';

const mapFileToModel = (file: NotebookItem, parentId: string): Page => {
    return {
        name: file.name,
        content: file.content!,
        createdAt: new Date(file.dateCreated),
        updatedAt: new Date(file.lastModified),
        pageID: file.id as unknown as number,
        FolderfolderID: parentId as unknown as number // FIX
    };
}

export const updateFile = async (req: Request, res: Response) => {
    const file: NotebookItem = req.body.file;
    const parentId: string = req.body.parentId;
    
    const response = await db.updateFile(
        req.ctx!, 
        mapFileToModel(file, parentId)
    );

    response
        ? res.status(200).send(`File ${file.id} was updated successfully.`)
        : res.status(400).send(`File ${file.id} could not be updated.`);
}