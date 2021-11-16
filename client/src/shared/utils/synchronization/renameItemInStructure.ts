import {
	getNotebookLocation,
	getNotebookName,
	getNotebookParentLocation
} from '@shared/notebook';
import fs from 'fs';
import p from 'path';
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

	itemPath =
		item.slice(-1) === p.sep ? item.substr(0, item.length - 1) : item;
	folderChain = itemPath.split(p.sep);
	folderChain = folderChain.slice(folderChain.indexOf(notebookName));

	itemName = folderChain.pop()!;

	newItemName = newName;
	newItemPath =
		itemPath.substring(0, itemPath.lastIndexOf(p.sep)) +
		p.sep +
		newItemName;

	level = 0;
};

const renameSubFolderPaths = (structure: any) => {
	if (!structure) return;
	let parentPaths = newItemPath
		.substr(newItemPath.indexOf(notebookName))
		.split(p.sep);

	if (structure.mimeType === 'Folder') {
		for (let folder of structure.subFolder) {
			folder.paths = parentPaths.concat(
				folder.paths.slice(parentPaths.length)
			);
			if (folder.mimeType === 'Folder') {
				renameSubFolderPaths(folder);
			}
		}
	}
};

const renameInStructure = (structure: any) => {
	if (!structure) return;
	level++;

	let absolutePath = p.join(getNotebookParentLocation(), ...structure.paths);
	let parentStats = fs.statSync(absolutePath);
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
				return (
					item.name === itemName &&
					itemPath.substr(itemPath.indexOf(notebookName)) ===
						p.join(...item.paths)
				);
			});
			structure.subFolder[itemIndex].name = newItemName;
			structure.subFolder[itemIndex].paths = newItemPath
				.substr(newItemPath.indexOf(notebookName))
				.split(p.sep);
			structure.subFolder[itemIndex].mimeType = stats.isDirectory()
				? 'Folder'
				: mime.lookup(newItemName);
			structure.subFolder[itemIndex].size = stats.size;
			structure.subFolder[itemIndex].statusModified = stats.ctime;
			renamedItem = structure.subFolder[itemIndex];

			if (stats.isDirectory()) {
				renameSubFolderPaths(structure.subFolder[itemIndex]);
			}
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
