import fs from 'fs';
import { FileSystemItem } from '../../types';
import { addFolderToStructure } from '../synchronization/addFolderToStructure';

// notebook should be mandatory, made it optional cause i didn't want to touch test file - J.X.
export function createDirectory(path: string, notebook: any = undefined) {
	let count = 0;
	let filename = 'Untitled';

	while (fs.existsSync(`${path}/${filename}`)) {
		filename = `Untitled (${++count})`;
	}

	const directory: FileSystemItem = {
		path: `${path}/${filename}`,
		name: filename,
		type: 'directory'
	};

	fs.mkdirSync(directory.path);

	if (notebook) {
		addFolderToStructure(directory.path, notebook);
	}
	return directory;
}
