import { deleteFile } from './deleteFile';
import { addFile } from './addFile';
import { addFolder } from './addFolder';
import { deleteFolder } from './deleteFolder'
import { updateFile } from './updateFile';
import { getFile } from './getFile';

export const db = {
    addFile,
    addFolder,
    deleteFile,
    deleteFolder,
    updateFile,
    getFile
};  