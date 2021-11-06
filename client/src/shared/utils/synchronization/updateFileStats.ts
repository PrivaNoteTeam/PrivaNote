import fs from 'fs';
import { getNotebookLocation, getNotebookName } from '@shared/notebook';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let notebookName: string;
let itemName: string;
let itemPath: string;
let level: number;

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
				let stats = fs.statSync(itemPath);
				structure.subFolder[itemIndex].size = stats.size;
				structure.subFolder[itemIndex].lastModified = stats.mtime;
			} else {
				throw Error('Item not found');
			}
		}
	}
};

export const updateFileStats = (path: any) => {
	try {
		notebookName = getNotebookName();
		itemPath = path.slice(-1) === '/' ? path.substr(0, path - 1) : path;
		folderChain = itemPath.split('/');
		folderChain = folderChain.slice(folderChain.indexOf(notebookName));
		itemName = folderChain.pop()!;
		level = 0;

		let notebookStructure = getNotebookStructure();
		findItem(notebookStructure);

		fs.writeFileSync(
			`${getNotebookLocation()}/.privanote/notebookStructure.json`,
			JSON.stringify(notebookStructure)
		);
	} catch (err) {
		console.log(err);
	}
};
