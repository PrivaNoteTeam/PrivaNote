import fs from 'fs';
import p from 'path';
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
		p.join(notebookLocation, '.privanote', 'notebookStructure.json'),
		JSON.stringify(notebookStructure, null, 4)
	);

	updateFileStats(
		p.join(notebookLocation, '.privanote', 'notebookStructure.json')
	);
};
