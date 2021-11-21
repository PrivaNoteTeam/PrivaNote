import p from 'path';
import {
	searchForFolder,
	uploadEntireNotebook,
	createAFolder,
	downloadAFile,
	googleDriveDownstream,
	googleDriveUpstream
} from '@googleDrive';
import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import {
	getItemFromStructure,
	getNotebookStructure,
	detectStructureChanges
} from '@synchronization';
import { NotebookItem, NotebookStructure } from '@types';

let ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';
let notebookName: string;
let notebookLocation: string;
let notebookStructure: NotebookStructure;

const initialSync = async () => {
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

						if (!response) {
							console.log(
								'No Changes detected, cloud and local match'
							);
						}
						if (response && response.type === 'LOCAL') {
							console.log('Changing local to match cloud');
							for (let change of response.changes) {
								await googleDriveDownstream(
									change.action,
									change.content
								);
							}
						}

						if (response && response.type === 'CLOUD') {
							console.log('Changing cloud to match local');
							for (let change of response.changes) {
								await googleDriveUpstream(
									change.action,
									change.content
								);
							}
						}

						return;
					}
				}
				// if no matching notebook is found with id
				uploadEntireNotebook(notebookStructure, ROOT_DRIVE_FOLDER_ID);
			}
		}
	}
};

export const initializeGoogleDrive = async () => {
	notebookName = getNotebookName();
	notebookLocation = getNotebookLocation();
	notebookStructure = getNotebookStructure();

	await initialSync();
	// subscribe to notebookstructure changes in the drive with google drive api watch
};
