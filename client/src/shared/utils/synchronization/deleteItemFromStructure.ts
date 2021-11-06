import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';
import { syncUpstream } from './syncUpstream';

let folderChain: Array<string>;
let notebookPath: string;
let notebookName: string;
let itemPath: string;
let itemName: string;
let level: number;

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
			structure.subFolder = structure.subFolder.filter(
				(item: any) =>
					item.name !== itemName && itemPath != item.absolutePath
			);
		}
	}
};

export const deleteItemFromStructure = (item: string) => {
	setupItemVariables(item);

	let notebookStructure = getNotebookStructure(notebookPath);
	removeFromStructure(notebookStructure);
	exportNotebookStructure(notebookPath, notebookStructure);
	syncUpstream('DELETE', 'NEW ITEM OR FOLDER ITEMS', notebookPath);
	// delete item on drive and upload the new notebookStructure.json config file to sync
};
