import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let notebookPath: string;
let notebookName: string;
let itemPath: string;
let itemName: string;
let level: number;

const setupItemVariables = (item: string, notebook: string) => {
	notebookPath =
		notebook.slice(-1) === '/'
			? notebook.substr(0, notebook.length - 1)
			: notebook;
	notebookName = notebookPath.split('/').slice(-1)[0];

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

export const deleteItemFromStructure = (item: string, notebook: string) => {
	setupItemVariables(item, notebook);

	let notebookStructure = getNotebookStructure(notebookPath);
	removeFromStructure(notebookStructure);
	exportNotebookStructure(notebookPath, notebookStructure);
	// delete item on drive and upload the new notebookStructure.json config file to sync
};
