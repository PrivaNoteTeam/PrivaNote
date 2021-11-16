import p from 'path';
import { getNotebookLocation } from '@shared/notebook';
import { getItemFromStructure } from '@shared/utils/synchronization/getItemFromStructure';
import { UpdateItemIDInStructure } from '@shared/utils/synchronization/UpdateItemIDInStructure';
import { createAFile } from './createAFile';
import { createAFolder } from './createAFolder';
import { deleteAFile } from './deleteAFile';
import { updateAFile } from './updateAFile';

let notebookLocation: string;
let notebookStructureLocation: string;

export const googleDriveUpstream = (action: string, content: any) => {
	notebookLocation = getNotebookLocation();
	notebookStructureLocation = `${notebookLocation}${p.sep}.privanote${p.sep}notebookStructure.json`;

	switch (action) {
		case 'ADD':
			if (content.item.mimeType === 'Folder') {
				createAFolder(content.item, content.parentIds.googleDrive).then(
					(res: any) => {
						content.item.ids.googleDrive = res.id;
						UpdateItemIDInStructure(content.item).then((res) => {
							if (!res) return;
							getItemFromStructure(
								notebookStructureLocation
							).then((item) => {
								updateAFile(item);
							});
						});
					}
				);
			} else {
				createAFile(content.item, content.parentIds.googleDrive).then(
					(res: any) => {
						content.item.ids.googleDrive = res.id;
						UpdateItemIDInStructure(content.item).then((res) => {
							if (!res) return;
							getItemFromStructure(
								notebookStructureLocation
							).then((item) => {
								updateAFile(item);
							});
						});
					}
				);
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
			if (
				content.item.mimeType != 'Folder' ||
				content.item.mimeType != 'Notebook'
			) {
				updateAFile(content.item).then(() => {
					getItemFromStructure(notebookStructureLocation).then(
						(item) => {
							updateAFile(item);
						}
					);
				});
			}
			break;
		default:
			break;
	}
};
