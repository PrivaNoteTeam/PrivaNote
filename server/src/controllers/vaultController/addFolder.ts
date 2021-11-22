import { Folder } from '.prisma/client';
import { Request, Response } from 'express';
import { db } from 'src/database/sync';
import { NotebookItem } from 'src/types';

const mapFolderToModel = (folder: NotebookItem, parentId: string): Folder => {
    return {
        name: folder.name,
        createdAt: new Date(folder.dateCreated),
        updatedAt: new Date(folder.lastModified),
        folderID: folder.id as unknown as number,
        ParentfolderID: parentId as unknown as number,
        NotebookbookID: 1, // to remove
    };
}

export const addFolder = async (req: Request, res: Response) => {
    const folder: NotebookItem = req.body.folder;
    const parentId = req.body.parentId;

    const response = await db.addFolder(
        req.ctx!,
        mapFolderToModel(folder, parentId)
    )

    response
        ? res.status(200).send(`Folder ${folder.id} was created successfully.`)
        : res.status(400).send(`Folder ${folder.id} could not be created.`);
}