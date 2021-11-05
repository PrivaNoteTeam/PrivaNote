import fs from 'fs';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let itemName: string;
let notebookName: string;
let itemPath: string;
let notebookPath: string;
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

const saveToStructure = (structure: any) => {
	if (!structure) return;
	level++;
	if (level < folderChain.length) {
		for (let folder of structure.subFolder) {
			if (
				folder.name === folderChain[level] &&
				(folder.mimeType === 'Folder' || folder.mimeType === 'Notebook')
			) {
				saveToStructure(folder);
			}
		}
	} else if (level === folderChain.length) {
		if (
			structure.mimeType === 'Notebook' ||
			structure.mimeType === 'Folder'
		) {
			let stats = fs.statSync(itemPath);
			let itemIndex = structure.subFolder.findIndex((item: any) => {
				return item.name === itemName && item.absolutePath === itemPath;
			});
			structure.subFolder[itemIndex].size = stats.size;
			structure.subFolder[itemIndex].lastModified = stats.mtime;
		}
	}
};

export const saveItemToStructure = (item: string, notebook: string) => {
	setupItemVariables(item, notebook);

	let notebookStructure = getNotebookStructure(notebookPath);
	saveToStructure(notebookStructure);
	exportNotebookStructure(notebookPath, notebookStructure);
	console.log(notebookStructure);
};
