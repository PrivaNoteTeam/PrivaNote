import {
	exportNotebookStructure,
	getItemFromStructure,
	getNotebookStructure,
	updateLastModified
} from '@synchronization';
import { SyncAction } from '@types';

/** Updates the notebook item last modified date in the notebook structure.
 * 	@param path The absolute or relative path of the notebook item location.
 */
export const saveItemToStructure = (path: string) => {
	return new Promise<SyncAction>(async (resolve, _) => {
		try {
			let notebookStructure = getNotebookStructure();

			notebookStructure = updateLastModified(notebookStructure, path);

			exportNotebookStructure(notebookStructure);
			const savedItem = await getItemFromStructure(path);

			resolve({ action: 'UPDATE', content: { item: savedItem } });
		} catch (err) {
			console.log(err);
		}
	});
};
