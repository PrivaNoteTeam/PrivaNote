import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import fs from 'fs';
import mime from 'mime-types';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let notebookPath: string;
let notebookName: string;
let itemPath: string;
let itemName: string;
let newItemName: string;
let newItemPath: string;
let level: number;
let renamedItem: {};

const setupItemVariables = (item: string, newName: string) => {
	notebookPath = getNotebookLocation();
	notebookName = getNotebookName();

	itemPath = item.slice(-1) === '/' ? item.substr(0, item.length - 1) : item;
	folderChain = itemPath.split('/');
	folderChain = folderChain.slice(folderChain.indexOf(notebookName));

	itemName = folderChain.pop()!;

	newItemName = newName;
	newItemPath =
		itemPath.substring(0, itemPath.lastIndexOf('/')) + '/' + newItemName;

	level = 0;
};

const renameInStructure = (structure: any) => {
	if (!structure) return;
	level++;

	let parentStats = fs.statSync(structure.absolutePath);
	structure.size = parentStats.size;
	structure.lastModified = parentStats.mtime;
	structure.statusModified = parentStats.ctime;

	if (level < folderChain.length) {
		for (let folder of structure.subFolder) {
			if (
				folder.name === folderChain[level] &&
				(folder.mimeType === 'Folder' || folder.mimeType === 'Notebook')
			) {
				renameInStructure(folder);
			}
		}
	} else if (level === folderChain.length) {
		if (
			structure.mimeType === 'Notebook' ||
			structure.mimeType === 'Folder'
		) {
			let stats = fs.statSync(newItemPath);
			let itemIndex = structure.subFolder.findIndex((item: any) => {
				return item.name === itemName && item.absolutePath === itemPath;
			});
			structure.subFolder[itemIndex].name = newItemName;
			structure.subFolder[itemIndex].absolutePath = newItemPath;
			structure.subFolder[itemIndex].mimeType = stats.isDirectory()
				? 'Folder'
				: mime.lookup(newItemName);
			structure.subFolder[itemIndex].size = stats.size;
			structure.subFolder[itemIndex].statusModified = stats.ctime;
			renamedItem = structure.subFolder[itemIndex];
		}
	}
};

export const renameItemInStructure = (item: string, newName: string) => {
	return new Promise<{}>((resolve, _) => {
		try {
			setupItemVariables(item, newName);
			let notebookStructure = getNotebookStructure(notebookPath);
			renameInStructure(notebookStructure);
			exportNotebookStructure(notebookStructure);
			resolve({ action: 'RENAME', content: { item: renamedItem } });
		} catch (err) {
			console.log(err);
		}
		// console.log(notebookStructure);
		// syncUpstream('RENAME', 'NEW ITEM OR FOLDER ITEMS', notebookPath);
	});
};
