import fs from 'fs';
import p from 'path';
import { getNotebookLocation } from '@shared/notebook';
import { NotebookStructure } from '@types';

/** Retrieves the notebook structure from the notebookStructure json file.
 * 	@param path [OPTIONAL] The absolute path of the notebook location.
 */
export const getNotebookStructure = (path: string = '') => {
	const location = path ? path : getNotebookLocation();
	const fileName = 'notebookStructure.json';

	if (!fs.existsSync(`${location}${p.sep}.privanote`))
		throw Error(".privanote folder doesn't exist.");
	if (!fs.existsSync(`${location}${p.sep}.privanote${p.sep}${fileName}`))
		throw Error(`${fileName} doesn't exist.`);
	try {
		const notebookStructure = fs
			.readFileSync(`${location}${p.sep}.privanote${p.sep}${fileName}`)
			.toString();
		return JSON.parse(notebookStructure) as NotebookStructure;
	} catch (err) {
		console.log('Error reading notebookStructure.json:\n', err);
		return [] as NotebookStructure;
	}
};
