import p from 'path';
import { NotebookItem, NotebookStructure } from '@types';
import { getNotebookStructure } from '@synchronization';

const findItem = (path: string, notebookStructure: NotebookStructure) => {
	return notebookStructure.find(
		(notebookItem) => p.join(...notebookItem.paths) === path
	);
};

/**
 * Returns the parent notebook item of a notebook item in the notebook structure
 * @param {NotebookItem} item A notebook item in the notebook structure
 */
export const getParentFromStructure = (item: NotebookItem) => {
	try {
		if (item.paths.length > 1 && item.mimeType != 'Notebook') {
			const notebookStructure = getNotebookStructure();

			const parentPath = p.join(
				...item.paths.slice(0, item.paths.length - 1)
			);

			const parentItem = findItem(parentPath, notebookStructure);

			return parentItem;
		} else if (item.paths.length === 1 && item.mimeType === 'Notebook') {
			return item;
		}
		throw Error('item does not have a parent in getParentFromStructure');
	} catch (err) {
		return err;
	}
};
