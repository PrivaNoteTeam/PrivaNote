import p from 'path';
import { getNotebookName } from '@shared/notebook';
import { getNotebookStructure } from '@synchronization';
import { NotebookItem, NotebookStructure } from '@types';

const findItem = (path: string, notebookStructure: NotebookStructure) => {
	return notebookStructure.find(
		(notebookItem) => p.join(...notebookItem.paths) === path
	);
};

/**
 * Locates item in structure by absolute or relative path and returns it
 * @param {string} path The path of an item
 */
export const getItemFromStructure = (path: string) => {
	return new Promise<NotebookItem>((resolve, _) => {
		try {
			path.slice(-1) === p.sep
				? path.substring(0, path.length - 1)
				: path;
			path = path.slice(path.indexOf(getNotebookName()));
			const notebookStructure = getNotebookStructure();

			const item = findItem(path, notebookStructure);
			if (!item) return;
			resolve(item);
		} catch (err) {
			console.log(err);
		}
	});
};
