import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';
import { NotebookItem, NotebookStructure } from '@types';

const findAndReplace = (
	updatedItem: NotebookItem,
	notebookStructure: NotebookStructure
) => {
	notebookStructure = notebookStructure.map((notebookItem) => {
		if (notebookItem.id === updatedItem.id) {
			return updatedItem;
		}
		return notebookItem;
	});

	return notebookStructure;
};

/**
 * Locates item in structure by name and path, then replaces the
 * item in the structure with a new updated item.
 * @param {NotebookItem} item An updated item for the notebook structure
 */
export const UpdateItemInStructure = (item: NotebookItem) => {
	return new Promise<Boolean>((resolve, _) => {
		try {
			let notebookStructure = getNotebookStructure();

			notebookStructure = findAndReplace(item, notebookStructure);

			exportNotebookStructure(notebookStructure);
			resolve(true);
		} catch (err) {
			console.log(err);
		}
	});
};
