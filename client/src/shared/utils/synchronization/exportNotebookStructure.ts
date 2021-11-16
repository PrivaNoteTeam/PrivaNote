import fs from 'fs';
import p from 'path';
import { createNotebookStructure } from './createNotebookStructure';
import { getNotebookName, getNotebookLocation } from '@shared/notebook';
import { updateLastModified } from './updateLastModified';
import { NotebookStructure } from '@types';

/** Exports the notebook structure that is received or creates a new one with
 * the notebook location. This function also ensure that the notebookStructure.json
 * item's lastModified date in the structure is updated.
 * 	@param structure The structure of the notebook. If not specified, a new one is
 * created.
 */
export const exportNotebookStructure = (
	structure: NotebookStructure = undefined!
) => {
	let notebookStructure: NotebookStructure;
	let notebookLocation = getNotebookLocation();
	if (structure) {
		notebookStructure = structure;
	} else {
		notebookStructure = createNotebookStructure(notebookLocation);
	}

	notebookStructure = updateLastModified(
		notebookStructure,
		p.join(getNotebookName(), '.privanote', 'notebookStructure.json')
	);

	fs.writeFileSync(
		p.join(notebookLocation, '.privanote', 'notebookStructure.json'),
		JSON.stringify(notebookStructure, null, 4)
	);
};
