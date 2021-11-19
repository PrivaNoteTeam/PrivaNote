import { getNotebookName } from '@shared/notebook';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';
import p from 'path';

/** Delete notebook item from the notebook strucure.
 * 	@param path The absolute path of the notebook item location.
 */
export const deleteItemFromStructure = (path: string) => {
	return new Promise<{}>((_, __) => {
		try {
			let notebookStructure = getNotebookStructure();

			path.slice(-1) === p.sep
				? path.substring(0, path.length - 1)
				: path;
			path = path.slice(path.indexOf(getNotebookName()));
			let pathLength = path.split(p.sep).length;

			notebookStructure = notebookStructure.filter((notebookItem) => {
				return (
					p.join(...notebookItem.paths.slice(0, pathLength)) !== path
				);
			});

			exportNotebookStructure(notebookStructure);
			// resolve({
			// 	action: 'DELETE',
			// 	content: { item: deletedItem }
			// });
		} catch (err) {
			console.log(err);
		}
	});
};
