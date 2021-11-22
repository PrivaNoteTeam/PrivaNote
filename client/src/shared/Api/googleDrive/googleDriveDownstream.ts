import p from 'path';
import fs from 'fs';
import { getNotebookParentLocation } from '@shared/notebook';
import { downloadAFile } from '@googleDrive';

let notebookParentLocation: string;

export const googleDriveDownstream = async (action: string, content: any) => {
	notebookParentLocation = getNotebookParentLocation();

	switch (action) {
		case 'ADD':
			if (content.item.mimeType === 'Folder') {
				fs.mkdirSync(
					p.join(notebookParentLocation, ...content.item.paths)
				);
			} else {
				await downloadAFile(
					content.item,
					p.join(notebookParentLocation, ...content.item.paths)
				);
			}
			break;
		case 'DELETE':
			fs.rmSync(p.join(notebookParentLocation, ...content.item.paths), {
				recursive: true,
				force: true
			});
			break;
		case 'RENAME':
			fs.renameSync(
				p.join(notebookParentLocation, ...content.renamedTarget.paths),
				p.join(notebookParentLocation, ...content.item.paths)
			);
			break;
		case 'UPDATE':
			if (
				content.item.mimeType != 'Folder' &&
				content.item.mimeType != 'Notebook'
			) {
				await downloadAFile(
					content.item,
					p.join(notebookParentLocation, ...content.item.paths)
				);
			}
			break;
		default:
			break;
	}
};
