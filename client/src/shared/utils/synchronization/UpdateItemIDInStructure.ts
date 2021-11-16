import p from 'path';
import { getNotebookName, getNotebookParentLocation } from '@shared/notebook';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';

let folderChain: Array<string>;
let notebookName: string;
let itemName: string;
let itemPath: string;
let level: number;
let newIds: {};

const findAndReplaceId = (structure: any) => {
	if (!structure) return;
	level++;
	if (level < folderChain.length) {
		for (let folder of structure.subFolder) {
			if (
				folder.name === folderChain[level] &&
				(folder.mimeType === 'Folder' || folder.mimeType === 'Notebook')
			) {
				findAndReplaceId(folder);
			}
		}
	} else if (level === folderChain.length) {
		if (
			structure.mimeType === 'Notebook' ||
			structure.mimeType === 'Folder'
		) {
			let itemIndex = structure.subFolder.findIndex((item: any) => {
				return (
					item.name === itemName &&
					itemPath.substr(itemPath.indexOf(notebookName)) ===
						p.join(...item.paths)
				);
			});
			if (itemIndex != -1) {
				structure.subFolder[itemIndex].ids = newIds;
			} else {
				throw Error('Item not found to update id');
			}
		}
	}
};

/**
 * Locates item in structure by name and absolutePath, then sets
 * the new id in the structure
 * @param {any} item An item of a notebookStructure's subFolder
 */
export const UpdateItemIDInStructure = (item: any) => {
	return new Promise<Boolean>((resolve, _) => {
		try {
			notebookName = getNotebookName();
			newIds = item.ids;
			itemName = item.name;
			itemPath = p.join(getNotebookParentLocation(), ...item.paths);
			folderChain = itemPath.split(p.sep);
			folderChain = folderChain.slice(folderChain.indexOf(notebookName));
			folderChain.pop();
			level = 0;

			let notebookStructure = getNotebookStructure();
			findAndReplaceId(notebookStructure);
			exportNotebookStructure(notebookStructure);
			resolve(true);
		} catch (err) {
			console.log(err);
		}
	});
};
