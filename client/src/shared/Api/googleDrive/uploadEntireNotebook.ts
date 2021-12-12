import p from 'path';
import { createAFolder, createAFile, updateAFile } from '@googleDrive';
import { getNotebookLocation } from '@shared/notebook';
import {
	getItemFromStructure,
	getParentFromStructure,
	updateItemInStructure
} from '@synchronization';
import { NotebookItem, NotebookStructure } from '@types';

const createNotebookRootFolder = async (
	notebookRoot: NotebookItem,
	driveRoot: NotebookItem
) => {
	await createAFolder(notebookRoot, driveRoot).then((res: any) => {
		notebookRoot.cloudIds.googleDrive = res.id;
		updateItemInStructure(notebookRoot);
	});
};

const uploadNotebookItem = async (notebookItem: NotebookItem) => {
	const parentItem = getParentFromStructure(notebookItem);
	if (notebookItem.mimeType === 'Folder') {
		await createAFolder(notebookItem, parentItem).then((res: any) => {
			notebookItem.cloudIds.googleDrive = res.id;
			updateItemInStructure(notebookItem);
		});
	} else {
		await createAFile(notebookItem, parentItem).then((res: any) => {
			notebookItem.cloudIds.googleDrive = res.id;
			updateItemInStructure(notebookItem);
		});
	}
};

export const uploadEntireNotebook = async (
	notebookStructure: NotebookStructure,
	ROOT_DRIVE_FOLDER_ID: string
) => {
	const privaNoteDriveFolder = {
		cloudIds: {
			googleDrive: ROOT_DRIVE_FOLDER_ID
		}
	};
	for (let notebookItem of notebookStructure) {
		if (notebookItem.mimeType === 'Notebook') {
			await createNotebookRootFolder(
				notebookItem,
				privaNoteDriveFolder as NotebookItem
			);
		} else {
			await uploadNotebookItem(notebookItem);
		}
	}

	getItemFromStructure(
		p.join(getNotebookLocation(), '.privanote', 'notebookStructure.json')
	).then((item) => {
		updateAFile(item);
	});
};
