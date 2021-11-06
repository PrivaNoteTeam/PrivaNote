import { getNotebookName } from '@shared/notebook';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let notebookName: string;
let itemName: string;
let itemPath: string;
let level: number;
let item: {};

const findItem = (structure: any) => {
	if (!structure) return;
	level++;
	if (level < folderChain.length) {
		for (let folder of structure.subFolder) {
			if (
				folder.name === folderChain[level] &&
				(folder.mimeType === 'Folder' || folder.mimeType === 'Notebook')
			) {
				findItem(folder);
			}
		}
	} else if (level === folderChain.length) {
		if (
			structure.mimeType === 'Notebook' ||
			structure.mimeType === 'Folder'
		) {
			let itemIndex = structure.subFolder.findIndex((item: any) => {
				return item.name === itemName && item.absolutePath === itemPath;
			});
			if (itemIndex != -1) {
				item = structure.subFolder[itemIndex];
			} else {
				throw Error('Item not found');
			}
		}
	}
};

/**
 * Locates item in structure by name and absolutePath and returns it
 * @param {any} path The path of an item
 */
export const getItemFromStructure = (path: any) => {
	return new Promise<{}>((resolve, _) => {
		try {
			notebookName = getNotebookName();
			itemPath = path.slice(-1) === '/' ? path.substr(0, path - 1) : path;
			folderChain = itemPath.split('/');
			folderChain = folderChain.slice(folderChain.indexOf(notebookName));
			itemName = folderChain.pop()!;
			level = 0;

			let notebookStructure = getNotebookStructure();
			findItem(notebookStructure);

			resolve(item);
		} catch (err) {
			console.log(err);
		}
	});
};
