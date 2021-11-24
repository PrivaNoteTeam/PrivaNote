import { createNotebook } from './createNotebook';

import { addFolder } from './addFolder';
import { updateFolder } from './updateFolder';
import { deleteFolder } from './deleteFolder';

import { deleteFile } from './deleteFile';
import { updateFile } from './updateFile';
import { addFile } from './addFile';

export const vaultController = {
	createNotebook,

	addFolder,
	updateFolder,
	deleteFolder,

	addFile,
	updateFile,
	deleteFile,
};
