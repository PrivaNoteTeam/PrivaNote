import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import fs from 'fs';
import mime from 'mime-types';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';
// import { syncUpstream } from './syncUpstream';

let folderChain: Array<string>;
let newItemName: string;
let notebookName: string;
let newItemPath: string;
let notebookPath: string;
let level: number;
let parentIds: {};
let newItem: any;

const setupItemVariables = (item: string) => {
	notebookPath = getNotebookLocation();
	notebookName = getNotebookName();

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
			parentIds = structure.ids;
			let stats = fs.statSync(newItemPath);
			newItem = {
				ids: {},
				name: newItemName,
				absolutePath: newItemPath,
				size: stats.size,
				dateCreated: stats.birthtime,
				lastModified: stats.mtime
			};

			if (stats.isDirectory()) {
				newItem.mimeType = 'Folder';
				newItem.subFolder = [];
			} else {
				newItem.mimeType = mime.lookup(newItemName);
			}
			structure.subFolder.push(newItem);
		}
	}
};

export const addItemToStructure = (item: string) => {
	return new Promise<{}>((resolve, _) => {
		try {
			setupItemVariables(item);
			let notebookStructure = getNotebookStructure(notebookPath);
			addToStructure(notebookStructure!);
			exportNotebookStructure(notebookStructure);
			resolve({
				action: 'ADD',
				content: { parentIds: parentIds, item: newItem }
			});
		} catch (err) {
			console.log(err);
		}
	});
	// syncUpstream(
	// 	'ADD',
	// 	{ parentIds: parentIds, newItem: newItem },
	// 	notebookPath
	// );
	// Upload new item along with the notebookStructure.json config file to sync
};
