import { searchForFolder } from './searchForFolder';
import { createNotebookStructure } from '@shared/utils/synchronization/createNotebookStructure';
import { uploadEntireNotebook } from './uploadEntireNotebook';
import { createAFolder } from './createAFolder';
import { FileItem } from '@types';
import { saveFile } from '@shared/utils';
import { getNotebookLocation } from '@shared/notebook';

let ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';

export const initializeGoogleDrive = () => {
	let notebookLocation: any = getNotebookLocation();
	let notebookItems: any = createNotebookStructure(notebookLocation);

	searchForFolder(ROOT_DRIVE_FOLDER_NAME).then(async (folders) => {
		if (!folders || !folders.length) {
			// Folder doesn't exist, creating a new one

			await createAFolder({ name: ROOT_DRIVE_FOLDER_NAME })
				.then(async (res) => {
					ROOT_DRIVE_FOLDER_ID = res.id;
					notebookItems = await uploadEntireNotebook(
						notebookItems,
						ROOT_DRIVE_FOLDER_ID
					);
				})
				.catch((err) => console.log(err));

			const name = 'notebookStructure.json';
			const exportFile: FileItem = {
				name: name,
				path: `${notebookLocation}/.privanote/${name}`
			};

			saveFile(exportFile, JSON.stringify(notebookItems));
		} else {
			// synchronize google drive with current files
			// createAFolder(ROOT_DRIVE_FOLDER_NAME, nanoid())
			// 	.then((res) => console.log(res))
			// 	.catch((err) => console.log(err));
		}
	});
};
