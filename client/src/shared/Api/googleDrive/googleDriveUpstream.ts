import p from 'path';
import { getNotebookLocation } from '@shared/notebook';
import {
	getItemFromStructure,
	getParentFromStructure,
	updateItemInStructure
} from '@synchronization';
import {
	createAFile,
	createAFolder,
	deleteAFile,
	updateAFile
} from '@googleDrive';
import { SyncContent, SyncType } from '@types';

let notebookLocation: string;
let notebookStructureLocation: string;

export const googleDriveUpstream = (action: SyncType, content: SyncContent) => {
	notebookLocation = getNotebookLocation();
	notebookStructureLocation = `${notebookLocation}${p.sep}.privanote${p.sep}notebookStructure.json`;

	switch (action) {
		case 'ADD':
			try {
				const parentItem = getParentFromStructure(content.item);
				if (content.item.mimeType === 'Folder') {
					createAFolder(content.item, parentItem).then((res: any) => {
						content.item.cloudIds.googleDrive = res.id;
						updateItemInStructure(content.item).then((res) => {
							if (!res) return;
							getItemFromStructure(
								notebookStructureLocation
							).then((item) => {
								updateAFile(item);
							});
						});
					});
				} else {
					createAFile(content.item, parentItem).then((res: any) => {
						content.item.cloudIds.googleDrive = res.id;
						updateItemInStructure(content.item).then((res) => {
							if (!res) return;
							getItemFromStructure(
								notebookStructureLocation
							).then((item) => {
								updateAFile(item);
							});
						});
					});
				}
			} catch (err) {
				console.log(err);
			}
			break;
		case 'DELETE':
			deleteAFile(content.item).then(() => {
				getItemFromStructure(notebookStructureLocation).then((item) => {
					updateAFile(item);
				});
			});
			break;
		case 'RENAME':
			updateAFile(content.item).then(() => {
				getItemFromStructure(notebookStructureLocation).then((item) => {
					updateAFile(item);
				});
			});
			break;
		case 'UPDATE':
			updateAFile(content.item).then(() => {
				getItemFromStructure(notebookStructureLocation).then((item) => {
					updateAFile(item);
				});
			});
			break;
		default:
			break;
	}
};
