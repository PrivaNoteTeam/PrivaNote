import { getNotebookLocation } from '@shared/notebook';
import { getItemFromStructure } from '@shared/utils/synchronization/getItemFromStructure';
import { UpdateItemIDInStructure } from '@shared/utils/synchronization/UpdateItemIDInStructure';
import { createAFile } from './createAFile';
import { createAFolder } from './createAFolder';
import { updateAFile } from './updateAFile';

let notebookLocation: string;
let notebookStructureLocation: string;

export const googleDriveUpstream = (action: string, content: any) => {
	notebookLocation = getNotebookLocation();
	notebookStructureLocation =
		notebookLocation + '/.privanote/notebookStructure.json';

	// console.log(action);
	// console.log(content);
	console.log(notebookLocation);

	switch (action) {
		case 'ADD':
			if (content.item.mimeType === 'Folder') {
				createAFolder(content.item, content.parentIds.googleDrive).then(
					(res: any) => {
						content.item.ids.googleDrive = res.id;
						UpdateItemIDInStructure(content.item).then((res) => {
							if (!res) return;
							getItemFromStructure(
								notebookStructureLocation
							).then((item) => {
								updateAFile(item);
							});
						});
					}
				);
			} else {
				createAFile(content.item, content.parentIds.googleDrive).then(
					(res: any) => {
						content.item.ids.googleDrive = res.id;
						UpdateItemIDInStructure(content.item).then((res) => {
							if (!res) return;
							getItemFromStructure(
								notebookStructureLocation
							).then((item) => {
								updateAFile(item);
							});
						});
					}
				);
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
