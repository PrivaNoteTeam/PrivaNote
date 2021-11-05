import fs from 'fs';
import { getNotebookLocation } from '@shared/notebook';

type structure = {
	ids: {};
	name: string;
	mimeType: string;
	absolutePath: string;
	size: number;
	dateCreated: Date;
	lastModified: Date;
	subFolder?: any[];
}[];

export const getNotebookStructure = (path: string = '') => {
	const location = path ? path : getNotebookLocation();
	const fileName = 'notebookStructure.json';

	if (!fs.existsSync(`${location}/.privanote`)) return;
	if (!fs.existsSync(`${location}/.privanote/${fileName}`)) return;
	try {
		const notebookStructure = fs
			.readFileSync(`${location}/.privanote/${fileName}`)
			.toString();
		return JSON.parse(notebookStructure) as structure;
	} catch (err) {
		console.log('Error reading notebookStructure.json:\n', err);
		return;
	}
};
