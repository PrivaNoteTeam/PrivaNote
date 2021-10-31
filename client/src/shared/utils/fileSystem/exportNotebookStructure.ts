import { saveFile } from './saveFile';
import { FileItem } from '../../types';
import { getNotebookStructure } from './getNotebookStructure';

export const exportNotebookStructure = (path: string) => {
	const notebookStructure = getNotebookStructure(path);

	const name = 'notebookStructure.json';
	const exportFile: FileItem = {
		name: name,
		path: `${path}/.privanote/${name}`
	};

	saveFile(exportFile, JSON.stringify(notebookStructure));
};
