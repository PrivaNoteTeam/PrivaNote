import fs from 'fs';
import mime from 'mime-types';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';
import { syncUpstream } from './syncUpstream';

let folderChain: Array<string>;
let newItemName: string;
let notebookName: string;
let newItemPath: string;
let notebookPath: string;
let level: number;

const setupItemVariables = (item: string, notebook: string) => {
	notebookPath =
		notebook.slice(-1) === '/'
			? notebook.substr(0, notebook.length - 1)
			: notebook;
	notebookName = notebookPath.split('/').slice(-1)[0];

	newItemPath =
		item.slice(-1) === '/' ? item.substr(0, item.length - 1) : item;
	folderChain = newItemPath.split('/');
	folderChain = folderChain.slice(folderChain.indexOf(notebookName));

	newItemName = folderChain.pop()!;

	level = 0;
};

const addToStructure = (structure: any) => {
	if (!structure) return;
	level++;
	if (level < folderChain.length) {
		for (let folder of structure.subFolder) {
			if (
				folder.name === folderChain[level] &&
				(folder.mimeType === 'Folder' || folder.mimeType === 'Notebook')
			) {
				addToStructure(folder);
			}
		}
	} else if (level === folderChain.length) {
		if (
			structure.mimeType === 'Notebook' ||
			structure.mimeType === 'Folder'
		) {
			let stats = fs.statSync(newItemPath);

			if (stats.isDirectory()) {
				structure.subFolder.push({
					ids: {},
					name: newItemName,
					mimeType: 'Folder',
					absolutePath: newItemPath,
					size: stats.size,
					dateCreated: stats.birthtime,
					lastModified: stats.mtime,
					subFolder: []
				});
			} else {
				structure.subFolder.push({
					ids: {},
					name: newItemName,
					mimeType: mime.lookup(newItemName),
					absolutePath: newItemPath,
					size: stats.size,
					dateCreated: stats.birthtime,
					lastModified: stats.mtime
				});
			}
		}
	}
};

export const addItemToStructure = (item: string, notebook: string) => {
	setupItemVariables(item, notebook);

	let notebookStructure = getNotebookStructure(notebookPath);
	addToStructure(notebookStructure!);
	exportNotebookStructure(notebookPath, notebookStructure);
	console.log(notebookStructure);
	syncUpstream('ADD', 'NEW ITEM OR FOLDER ITEMS', notebook);
	// Upload new item along with the notebookStructure.json config file to sync
};
