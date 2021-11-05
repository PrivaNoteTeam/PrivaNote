import { searchForFolder } from './searchForFolder';
import { uploadEntireNotebook } from './uploadEntireNotebook';
import { createAFolder } from './createAFolder';
import { saveFile } from '@shared/utils';
import { getNotebookLocation } from '@shared/notebook';
import { getNotebookStructure } from '@shared/utils/synchronization/getNotebookStructure';

let ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';

export const initializeGoogleDrive = () => {
	let notebookLocation = getNotebookLocation();
	let notebookItems = getNotebookStructure(notebookLocation);

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
			saveFile(
				{ name: name, path: `${notebookLocation}/.privanote/${name}` },
				JSON.stringify(notebookItems)
			);
		} else {
			// synchronize google drive with current files
			// createAFolder(ROOT_DRIVE_FOLDER_NAME, nanoid())
			// 	.then((res) => console.log(res))
			// 	.catch((err) => console.log(err));
		}
	});
};
