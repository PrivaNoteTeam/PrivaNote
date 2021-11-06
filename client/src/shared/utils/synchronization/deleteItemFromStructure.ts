import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let notebookPath: string;
let notebookName: string;
let itemPath: string;
let itemName: string;
let level: number;
let deletedItem: {};

const setupItemVariables = (item: string) => {
	notebookPath = getNotebookLocation();
	notebookName = getNotebookName();

	itemPath = item.slice(-1) === '/' ? item.substr(0, item.length - 1) : item;
	folderChain = itemPath.split('/');
	folderChain = folderChain.slice(folderChain.indexOf(notebookName));

	itemName = folderChain.pop()!;

	level = 0;
};

const removeFromStructure = (structure: any) => {
	if (!structure) return;
	level++;
	if (level < folderChain.length) {
		for (let folder of structure.subFolder) {
			if (
				folder.name === folderChain[level] &&
				(folder.mimeType === 'Folder' || folder.mimeType === 'Notebook')
			) {
				removeFromStructure(folder);
			}
		}
	} else if (level === folderChain.length) {
		if (
			structure.mimeType === 'Notebook' ||
			structure.mimeType === 'Folder'
		) {
			structure.subFolder = structure.subFolder.filter((item: any) => {
				if (item.name !== itemName && itemPath != item.absolutePath) {
					return true;
				} else {
					deletedItem = item;
					return false;
				}
			});
		}
	}
};

export const deleteItemFromStructure = (item: string) => {
	return new Promise<{}>((resolve, _) => {
		try {
			setupItemVariables(item);
			let notebookStructure = getNotebookStructure(notebookPath);
			removeFromStructure(notebookStructure);
			exportNotebookStructure(notebookStructure);
			resolve({
				action: 'DELETE',
				content: { item: deletedItem }
			});
		} catch (err) {
			console.log(err);
		}
	});

	// syncUpstream('DELETE', 'NEW ITEM OR FOLDER ITEMS', notebookPath);
	// delete item on drive and upload the new notebookStructure.json config file to sync
};
