import { updateFileID } from '@shared/utils/synchronization/updateFileID';
import { createAFile } from './createAFile';
import { createAFolder } from './createAFolder';

let notebookLocation: string;

export const googleDriveUpstream = (
	action: string,
	content: any,
	notebook: string
) => {
	// console.log(action);
	// console.log(content);
	// console.log(notebook);
	notebookLocation = notebook;
	console.log(notebookLocation);

	switch (action) {
		case 'ADD':
			console.log('Add new file or folder to google drive');
			if ((content.mimeType = 'Folder')) {
				createAFolder(
					content.newItem,
					content.parentIds.googleDrive
				).then((res: any) => {
					content.newItem.ids.googleDrive = res.id;
					updateFileID(content.newItem);
				});
			} else {
				createAFile(content.newItem, content.parentIds.googleDrive);
			}
			break;
		case 'DELETE':
			console.log('Delete file or folder from google Drive');
			break;
		case 'RENAME':
			console.log('Change the name of a file or folder in Google Drive');
			break;
		case 'SAVE':
			console.log('Save new content to a file in Google Drive');
			break;
		default:
			break;
	}
};
