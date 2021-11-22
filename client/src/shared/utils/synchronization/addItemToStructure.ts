import {
	exportNotebookStructure,
	getNotebookStructure,
	createNotebookItem
} from '@synchronization';
import { SyncAction } from '@types';

/** Adds a notebook item to the notebook structure
 * 	@param path The absolute path of the notebook item.
 */
export const addItemToStructure = (path: string) => {
	return new Promise<SyncAction>((resolve, _) => {
		try {
			let notebookStructure = getNotebookStructure();

			let newItem = createNotebookItem(path);

			notebookStructure.push(newItem);

			exportNotebookStructure(notebookStructure);
			resolve({
				action: 'ADD',
				content: { item: newItem }
			});
		} catch (err) {
			console.log(err);
		}
	});
};
