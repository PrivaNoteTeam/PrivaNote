import { saveFile } from '../fileSystem/saveFile';
import { FileItem } from '../../types';
import { createNotebookStructure } from './createNotebookStructure';

export const exportNotebookStructure = (
	path: string,
	structure: any = undefined
) => {
	let notebookStructure: any;
	if (structure) {
		notebookStructure = structure;
	} else {
		notebookStructure = createNotebookStructure(path);
	}

	const name = 'notebookStructure.json';
	const exportFile: FileItem = {
		name: name,
		path: `${path}/.privanote/${name}`
	};

	saveFile(exportFile, JSON.stringify(notebookStructure));
};
