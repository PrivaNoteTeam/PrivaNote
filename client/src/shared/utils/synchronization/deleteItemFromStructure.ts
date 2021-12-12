import { getNotebookName } from '@shared/notebook';
import {
	exportNotebookStructure,
	getNotebookStructure
} from '@synchronization';
import { SyncAction } from '@types';
import p from 'path';

/** Delete notebook item from the notebook structure.
 * 	@param path The absolute path of the notebook item location.
 */
export const deleteItemFromStructure = (path: string) => {
	return new Promise<SyncAction>((resolve, _) => {
		try {
			let notebookStructure = getNotebookStructure();

			path.slice(-1) === p.sep
				? path.substring(0, path.length - 1)
				: path;
			path = path.slice(path.indexOf(getNotebookName()));
			let pathLength = path.split(p.sep).length;

			const deletedItem = notebookStructure.find(
				(notebookItem) => p.join(...notebookItem.paths) === path
			);

			if (!deletedItem)
				throw Error('Item to delete not found in notebook structure');

			notebookStructure = notebookStructure.filter((notebookItem) => {
				return (
					p.join(...notebookItem.paths.slice(0, pathLength)) !== path
				);
			});

			exportNotebookStructure(notebookStructure);
			resolve({
				action: 'DELETE',
				content: { item: deletedItem }
			});
		} catch (err) {
			console.log(err);
		}
	});
};
