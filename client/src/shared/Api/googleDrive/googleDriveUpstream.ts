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

export const googleDriveUpstream = async (
	action: SyncType,
	content: SyncContent
) => {
	notebookLocation = getNotebookLocation();
	notebookStructureLocation = `${notebookLocation}${p.sep}.privanote${p.sep}notebookStructure.json`;

	switch (action) {
		case 'ADD':
			try {
				const parentItem = getParentFromStructure(content.item);
				if (content.item.mimeType === 'Folder') {
					await createAFolder(content.item, parentItem).then(
						async (res: any) => {
							content.item.cloudIds.googleDrive = res.id;
							await updateItemInStructure(content.item).then(
								(res) => {
									if (!res) return;
									getItemFromStructure(
										notebookStructureLocation
									).then(async (item) => {
										await updateAFile(item);
									});
								}
							);
						}
					);
				} else {
					await createAFile(content.item, parentItem).then(
						async (res: any) => {
							content.item.cloudIds.googleDrive = res.id;
							await updateItemInStructure(content.item).then(
								(res) => {
									if (!res) return;
									getItemFromStructure(
										notebookStructureLocation
									).then(async (item) => {
										await updateAFile(item);
									});
								}
							);
						}
					);
				}
			} catch (err) {
				console.log(err);
			}
			break;
		case 'DELETE':
			await deleteAFile(content.item).then(() => {
				getItemFromStructure(notebookStructureLocation).then(
					async (item) => {
						await updateAFile(item);
					}
				);
			});
			break;
		case 'RENAME':
			await updateAFile(content.item).then(() => {
				getItemFromStructure(notebookStructureLocation).then(
					async (item) => {
						await updateAFile(item);
					}
				);
			});
			break;
		case 'UPDATE':
			await updateAFile(content.item).then(() => {
				getItemFromStructure(notebookStructureLocation).then(
					async (item) => {
						await updateAFile(item);
					}
				);
			});
			break;
		default:
			break;
	}
};
