import { createNotebook } from './createNotebook';

import { addFolder } from './addFolder';
import { updateFolder } from './updateFolder';
import { deleteFolder } from './deleteFolder';

import { deleteFile } from './deleteFile';
import { updateFile } from './updateFile';
import { addFile } from './addFile';

import { addAttachment } from './addAttachment';
import { deleteAttachment } from './deleteAttachment';

export const vaultController = {
	createNotebook,

	addFolder,
	updateFolder,
	deleteFolder,

	addFile,
	updateFile,
	deleteFile,

	addAttachment,
	deleteAttachment
};
