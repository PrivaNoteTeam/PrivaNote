import fs from 'fs';
import { createNotebookStructure } from './createNotebookStructure';
import { getNotebookLocation } from '@shared/notebook';
import { updateFileStats } from './updateFileStats';

export const exportNotebookStructure = (structure: any = undefined) => {
	let notebookStructure: any;
	let notebookLocation = getNotebookLocation();
	if (structure) {
		notebookStructure = structure;
	} else {
		notebookStructure = createNotebookStructure(notebookLocation);
	}

	fs.writeFileSync(
		`${notebookLocation}/.privanote/notebookStructure.json`,
		JSON.stringify(notebookStructure, null, 4)
	);

	updateFileStats(`${notebookLocation}/.privanote/notebookStructure.json`);
};
