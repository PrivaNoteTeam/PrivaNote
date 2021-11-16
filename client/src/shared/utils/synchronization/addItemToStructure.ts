import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';
import { createNotebookItem } from './createNotebookItem';

/** Adds a notebook item to the notebook structure
 * 	@param path The absolute path of the notebook item.
 */
export const addItemToStructure = (path: string) => {
	return new Promise<{}>((_, __) => {
		try {
			let notebookStructure = getNotebookStructure();

			let item = createNotebookItem(path);

			notebookStructure.push(item);

			exportNotebookStructure(notebookStructure);
			// resolve({
			// 	action: 'ADD',
			// 	content: { parentIds: parentIds, item: newItem }
			// });
		} catch (err) {
			console.log(err);
		}
	});
};
