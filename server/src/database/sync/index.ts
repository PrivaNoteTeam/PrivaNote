import { deleteFile } from './deleteFile';
import { addFile } from './addFile';
import { addFolder } from './addFolder';
import { deleteFolder } from './deleteFolder'
import { updateFile } from './updateFile';

export const db = {
    addFile,
    addFolder,
    deleteFile,
    deleteFolder,
    updateFile
};  