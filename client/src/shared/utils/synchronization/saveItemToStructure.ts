import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';
import { updateLastModified } from './updateLastModified';

/** Updates the notebook item last modified date in the notebook structure.
 * 	@param path The absolute or relative path of the notebook item location.
 */
export const saveItemToStructure = (path: string) => {
	return new Promise<{}>((_, __) => {
		try {
			let notebookStructure = getNotebookStructure();

			notebookStructure = updateLastModified(notebookStructure, path);

			exportNotebookStructure(notebookStructure);
			// resolve({ action: 'UPDATE', content: { item: savedItem } });
		} catch (err) {
			console.log(err);
		}
	});
};
