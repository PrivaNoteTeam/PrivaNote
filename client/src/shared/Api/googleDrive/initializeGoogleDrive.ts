import fs from 'fs';
import p from 'path';
import { searchForFolder } from './searchForFolder';
import { uploadEntireNotebook } from './uploadEntireNotebook';
import { createAFolder } from './createAFolder';
import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import { getNotebookStructure } from '@shared/utils/synchronization/getNotebookStructure';
import { getItemFromStructure } from '@shared/utils/synchronization/getItemFromStructure';
import { downloadAFile } from './downloadAFile';
import { updateFileStats } from '@shared/utils/synchronization/updateFileStats';
import { updateAFile } from './updateAFile';
import { detectStructureChanges } from '@shared/utils/synchronization/detectStructureChanges';

let ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';
let notebookName: string;
let notebookLocation: string;

const uploadNewNotebook = async (structure: any, parentId: string) => {
	let structureLocation = `${notebookLocation}${p.sep}.privanote${p.sep}notebookStructure.json`;
	structure = await uploadEntireNotebook(structure, parentId);
	// rewrite updated structure that contains new google ids
	fs.writeFileSync(structureLocation, JSON.stringify(structure, null, 4));

	updateFileStats(structureLocation);
	getItemFromStructure(structureLocation).then((item) => {
		updateAFile(item);
	});
};

export const initializeGoogleDrive = () => {
	notebookName = getNotebookName();
	notebookLocation = getNotebookLocation();
	let notebookStructure: any = getNotebookStructure(notebookLocation);

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
						// check if structure was not previously connected already
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
									let item = await getItemFromStructure(
										`${notebookLocation}${p.sep}.privanote${p.sep}notebookStructure.json`
									);
									await downloadAFile(item).then(
										(cloudStructure) => {
											// merge drive items and local items
											detectStructureChanges(
												cloudStructure
											);
										}
									);
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
