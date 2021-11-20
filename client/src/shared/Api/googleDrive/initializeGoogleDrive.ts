// import fs from 'fs';
import p from 'path';
import {
	searchForFolder,
	uploadEntireNotebook,
	createAFolder,
	downloadAFile,
	googleDriveDownstream
	// updateAFile,
	// googleDriveDownstream,
	// googleDriveUpstream
} from '@googleDrive';
import {
	getNotebookLocation,
	getNotebookName
	// 	// getNotebookParentLocation
} from '@shared/notebook';
import {
	getItemFromStructure,
	getNotebookStructure,
	// getItemFromStructure,
	detectStructureChanges
} from '@synchronization';
import { NotebookItem, NotebookStructure } from '@types';

let ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';
let notebookName: string;
let notebookLocation: string;
let notebookStructure: NotebookStructure;

export const initializeGoogleDrive = async () => {
	notebookName = getNotebookName();
	notebookLocation = getNotebookLocation();
	notebookStructure = getNotebookStructure();

	const driveRootFolder = await searchForFolder(ROOT_DRIVE_FOLDER_NAME);
	if (!driveRootFolder || !driveRootFolder.length) {
		// Folder doesn't exist, creating a new one
		await createAFolder({
			name: ROOT_DRIVE_FOLDER_NAME
		} as NotebookItem)
			.then(async (res) => {
				ROOT_DRIVE_FOLDER_ID = res.id;
				uploadEntireNotebook(notebookStructure, ROOT_DRIVE_FOLDER_ID);
			})
			.catch((err) => console.log(err));
	} else {
		ROOT_DRIVE_FOLDER_ID = driveRootFolder[0].id!;
		const driveNotebook = await searchForFolder(
			notebookName,
			ROOT_DRIVE_FOLDER_ID
		);

		if (!driveNotebook || !driveNotebook.length) {
			uploadEntireNotebook(notebookStructure, ROOT_DRIVE_FOLDER_ID);
		} else {
			const notebookFolderItem = await getItemFromStructure(
				notebookName,
				notebookStructure
			);

			if (!notebookFolderItem.cloudIds.googleDrive) {
				uploadEntireNotebook(notebookStructure, ROOT_DRIVE_FOLDER_ID);
			} else {
				for (let notebook of driveNotebook) {
					// google drive allows duplicate folder names
					if (
						notebook.id === notebookFolderItem.cloudIds.googleDrive
					) {
						console.log('Start Syncing with recent files');
						const notebookStructureItem =
							await getItemFromStructure(
								p.join(
									notebookLocation,
									'.privanote',
									'notebookStructure.json'
								)
							);

						const cloudStructureItem = await downloadAFile(
							notebookStructureItem
						);

						const response =
							detectStructureChanges(cloudStructureItem);

						console.log(response);

						if (response.type === 'LOCAL') {
							response.changes.forEach(async (change) => {
								await googleDriveDownstream(
									change.action,
									change.content
								);
							});
						}

						return;
					}
				}
				// if no matching notebook is found with id
				uploadEntireNotebook(notebookStructure, ROOT_DRIVE_FOLDER_ID);
			}
		}

		// ROOT_DRIVE_FOLDER_ID = folders[0].id!;
		// searchForFolder(notebookName, ROOT_DRIVE_FOLDER_ID)
		// 	.then(async (folders) => {
		// 		console.log(folders);
		// 		if (!folders || !folders.length) {
		// 			await uploadNewNotebook(
		// 				notebookStructure,
		// 				ROOT_DRIVE_FOLDER_ID
		// 			);
		// 		} else {
		// 			// check if structure was not previously connected already
		// 			if (!notebookStructure.ids.googleDrive) {
		// 				await uploadNewNotebook(
		// 					notebookStructure,
		// 					ROOT_DRIVE_FOLDER_ID
		// 				);
		// 				return;
		// 			} else {
		// 				// check if matches notebook id, if not create new
		// 				for (let folder of folders) {
		// 					if (
		// 						folder.id ===
		// 							notebookStructure.ids.googleDrive &&
		// 						folder.name === notebookStructure.name
		// 					) {
		// 						// sync with recent modified files
		// 						let item = await getItemFromStructure(
		// 							`${notebookLocation}${p.sep}.privanote${p.sep}notebookStructure.json`
		// 						);
		// 						await downloadAFile(item).then(
		// 							(cloudStructure) => {
		// 								// merge drive items and local items
		// 								let respond =
		// 									detectStructureChanges(
		// 										cloudStructure
		// 									);
		// 								// console.log('INIT', changes);
		// 								if (respond.type === 'LOCAL') {
		// 									respond.changes.forEach(
		// 										(change: any) => {
		// 											googleDriveDownstream(
		// 												change.action,
		// 												change.content
		// 											);
		// 										}
		// 									);
		// 								} else if (
		// 									respond.type === 'CLOUD'
		// 								) {
		// 									respond.changes.forEach(
		// 										(change: any) => {
		// 											if (
		// 												change.action ===
		// 												'ADD'
		// 											) {
		// 												if (
		// 													!change.content
		// 														.parentIds
		// 														.googleDrive
		// 												) {
		// 													let parentItem: any =
		// 														getItemFromStructure(
		// 															p.join(
		// 																getNotebookParentLocation(),
		// 																...change
		// 																	.content
		// 																	.item
		// 																	.paths
		// 															)
		// 														);
		// 													console.log(
		// 														parentItem
		// 													);
		// 													change.content.parentIds =
		// 														parentItem.ids;
		// 												}
		// 											}
		// 											console.log(
		// 												'---\nACTION: ',
		// 												change.action,
		// 												'\n',
		// 												change.content.item
		// 											);
		// 											if (
		// 												change.action ===
		// 												'ADD'
		// 											) {
		// 												console.log(
		// 													change.content
		// 														.parentIds
		// 												);
		// 											}
		// 											console.log('---');
		// 											googleDriveUpstream(
		// 												change.action,
		// 												change.content
		// 											);
		// 										}
		// 									);
		// 								}
		// 							}
		// 						);
		// 						console.log(
		// 							'sync with recent modified files'
		// 						);
		// 						return;
		// 					}
		// 				}
		// 				// if current notebook opened is not found in drive, upload new notebook
		// 				await uploadNewNotebook(
		// 					notebookStructure,
		// 					ROOT_DRIVE_FOLDER_ID
		// 				);
		// 			}
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
	}
	// });
	// subscribe to structure changes in the drive with google drive api watch
};
