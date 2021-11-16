import p from 'path';
import { getNotebookName } from '@shared/notebook';
import { NotebookStructure } from '@types';

/** Updates the last modified date of a notebook item in the notebook structure
 * with Date.now().toISOString()
 * 	@param notebookStructure The structure of the notebook
 * 	@param path The absolute or relative path of the notebook item
 */
export const updateLastModified = (
	notebookStructure: NotebookStructure,
	path: string
) => {
	try {
		if (!path) throw Error('Path is not undefined');
		let notebookName = getNotebookName();
		let itemPath =
			path.slice(-1) === p.sep ? path.substr(0, path.length - 1) : path;
		itemPath = itemPath.substr(itemPath.indexOf(notebookName));

		for (let item of notebookStructure) {
			if (p.join(...item.paths) === itemPath) {
				item.lastModified = new Date().toISOString();
			}
		}
	} catch (err) {
		console.log(err);
	}
	return notebookStructure as NotebookStructure;
};
