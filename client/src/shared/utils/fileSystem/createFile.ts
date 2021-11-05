import fs from 'fs';
import { FileItem } from '../../types';
import { addItemToStructure } from '../synchronization/addItemToStructure';

// notebook should be mandatory, made it optional cause i didn't want to touch test file - J.X.
export function createFile(path: string, notebook: any = undefined) {
	let count = 0;
	let filename = 'Untitled.md';

	while (fs.existsSync(`${path}/${filename}`)) {
		filename = `Untitled (${++count}).md`;
	}

	const file: FileItem = {
		path: `${path}/${filename}`,
		name: filename
	};

	fs.writeFileSync(file.path, '');

	if (notebook) {
		addItemToStructure(file.path, notebook);
	}

	return file;
}
