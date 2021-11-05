import fs from 'fs';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let newFolderName: string;
let notebookName: string;
let newFolderPath: string;
let notebookPath: string;
let level: number;

const setupNotebookVariables = (folder: string, notebook: string) => {
	notebookPath =
		notebook.slice(-1) === '/'
			? notebook.substr(0, notebook.length - 1)
			: notebook;
	notebookName = notebookPath.split('/').slice(-1)[0];

	newFolderPath =
		folder.slice(-1) === '/' ? folder.substr(0, folder.length - 1) : folder;
	folderChain = newFolderPath.split('/');
	folderChain = folderChain.slice(folderChain.indexOf(notebookName));

	newFolderName = folderChain[folderChain.length - 1];
	level = 1;
};

const addToStructure = (structure: any) => {
	if (!structure) return;
	level++;
	if (level < folderChain.length) {
		for (let folder of structure.subFolder) {
			if (
				folder.name === folderChain[level] &&
				folder.mimeType === 'Folder'
			) {
				addToStructure(folder);
			}
		}
	} else if (level === folderChain.length) {
		if (
			structure.mimeType === 'Notebook' ||
			structure.mimeType === 'Folder'
		) {
			let stats = fs.statSync(newFolderPath);
			structure.subFolder.push({
				ids: {},
				name: newFolderName,
				mimeType: 'Folder',
				absolutePath: newFolderPath,
				size: stats.size,
				dateCreated: stats.birthtime,
				lastModified: stats.mtime,
				subFolder: []
			});
		}
	}
};

export const addFolderToStructure = (folder: string, notebook: string) => {
	setupNotebookVariables(folder, notebook);

	let notebookStructure = getNotebookStructure(notebookPath);
	addToStructure(notebookStructure!);
	exportNotebookStructure(notebookPath, notebookStructure);
	console.log(notebookStructure);
	// Upload new folder along with the notebookStructure.json config file to sync
};
