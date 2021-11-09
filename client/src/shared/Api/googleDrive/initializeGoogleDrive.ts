// import fs from 'fs';
import { searchForFolder } from './searchForFolder';
import { uploadEntireNotebook } from './uploadEntireNotebook';
import { createAFolder } from './createAFolder';
import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import { getNotebookStructure } from '@shared/utils/synchronization/getNotebookStructure';

let ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';

export const initializeGoogleDrive = () => {
	let notebookName = getNotebookName();
	let notebookLocation = getNotebookLocation();
	let notebookStructure = getNotebookStructure(notebookLocation);

	searchForFolder(ROOT_DRIVE_FOLDER_NAME).then(async (folders) => {
		if (!folders || !folders.length) {
			// Folder doesn't exist, creating a new one

			await createAFolder({ name: ROOT_DRIVE_FOLDER_NAME })
				.then(async (res) => {
					ROOT_DRIVE_FOLDER_ID = res.id;
					await uploadEntireNotebook(
						notebookStructure,
						ROOT_DRIVE_FOLDER_ID
					);
				})
				.catch((err) => console.log(err));
		} else {
			ROOT_DRIVE_FOLDER_ID = folders[0].id!;
			searchForFolder(notebookName, ROOT_DRIVE_FOLDER_ID)
				.then(async (folders) => {
					if (!folders || !folders.length) {
						await uploadEntireNotebook(
							notebookStructure,
							ROOT_DRIVE_FOLDER_ID
						);
					} else {
						// check if matches notebook id, if not create new
					}
				})
				.catch((err) => console.log(err));
			// synchronize google drive with current files
			// createAFolder(ROOT_DRIVE_FOLDER_NAME, nanoid())
			// 	.then((res) => console.log(res))
			// 	.catch((err) => console.log(err));
		}
	});
};
