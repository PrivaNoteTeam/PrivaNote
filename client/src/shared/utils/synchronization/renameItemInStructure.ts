import { getNotebookName } from '@shared/notebook';
import p from 'path';
import { exportNotebookStructure } from './exportNotebookStructure';
import { getNotebookStructure } from './getNotebookStructure';

/** Rename a notebook item and update its path along with all its children.
 * 	@param path The absolute path of the notebook item location.
 * 	@param newName The new name of the notebook item.
 */
export const renameItemInStructure = (path: string, newName: string) => {
	return new Promise<{}>((_, __) => {
		try {
			let notebookStructure = getNotebookStructure();

			path.slice(-1) === p.sep
				? path.substring(0, path.length - 1)
				: path;
			path = path.slice(path.indexOf(getNotebookName()));
			let pathLength = path.split(p.sep).length;

			notebookStructure = notebookStructure.map((notebookItem) => {
				let itemPath = p.join(...notebookItem.paths);
				if (itemPath.indexOf(path) === 0) {
					if (itemPath.length === path.length) {
						notebookItem.name = newName;
					}
					notebookItem.paths[pathLength - 1] = newName;
					return notebookItem;
				}
				return notebookItem;
			});

			exportNotebookStructure(notebookStructure);
			// resolve({ action: 'RENAME', content: { item: renamedItem } });
		} catch (err) {
			console.log(err);
		}
	});
};
