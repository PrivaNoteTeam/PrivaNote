import fs from 'fs';
import { searchForFolder } from './searchForFolder';
import { uploadEntireNotebook } from './uploadEntireNotebook';
import { createAFolder } from './createAFolder';
import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import { getNotebookStructure } from '@shared/utils/synchronization/getNotebookStructure';

let ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';
let notebookName: string;
let notebookLocation: string;

const uploadNewNotebook = async (structure: any, parentId: string) => {
	structure = await uploadEntireNotebook(structure, parentId);
	// rewrite updated structure that contains new google ids
	fs.writeFileSync(
		`${notebookLocation}/.privanote/notebookStructure.json`,
		JSON.stringify(structure, null, 4)
	);
};

export const initializeGoogleDrive = () => {
	let notebookStructure: any = getNotebookStructure(notebookLocation);
	notebookName = getNotebookName();
	notebookLocation = getNotebookLocation();

	searchForFolder(ROOT_DRIVE_FOLDER_NAME).then(async (folders) => {
		if (!folders || !folders.length) {
			// Folder doesn't exist, creating a new one
			await createAFolder({ name: ROOT_DRIVE_FOLDER_NAME })
				.then(async (res) => {
					ROOT_DRIVE_FOLDER_ID = res.id;
					uploadNewNotebook(notebookStructure, ROOT_DRIVE_FOLDER_ID);
				})
				.catch((err) => console.log(err));
		} else {
			ROOT_DRIVE_FOLDER_ID = folders[0].id!;
			searchForFolder(notebookName, ROOT_DRIVE_FOLDER_ID)
				.then(async (folders) => {
					console.log(folders);
					if (!folders || !folders.length) {
						await uploadNewNotebook(
							notebookStructure,
							ROOT_DRIVE_FOLDER_ID
						);
					} else {
						// check if structure was previously connected already
						if (!notebookStructure.ids.googleDrive) {
							await uploadNewNotebook(
								notebookStructure,
								ROOT_DRIVE_FOLDER_ID
							);
							return;
						} else {
							// check if matches notebook id, if not create new
							for (let folder of folders) {
								if (
									folder.id ===
										notebookStructure.ids.googleDrive &&
									folder.name === notebookStructure.name
								) {
									// sync with recent modified files
									console.log(
										'sync with recent modified files'
									);
									return;
								}
							}

							// if current notebook opened is not found in drive, upload new notebook
							await uploadNewNotebook(
								notebookStructure,
								ROOT_DRIVE_FOLDER_ID
							);
						}
					}
				})
				.catch((err) => console.log(err));
		}
	});
	// subscribe to structure changes in the drive with google drive api watch
};
