import { saveFile } from '../fileSystem/saveFile';
import { FileItem } from '../../types';
import { createNotebookStructure } from './createNotebookStructure';

export const exportNotebookStructure = (path: string) => {
	const notebookStructure = createNotebookStructure(path);

	const name = 'notebookStructure.json';
	const exportFile: FileItem = {
		name: name,
		path: `${path}/.privanote/${name}`
	};

	saveFile(exportFile, JSON.stringify(notebookStructure));
};
