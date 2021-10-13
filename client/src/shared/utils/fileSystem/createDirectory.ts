import fs from 'fs';
import { FileSystemItem } from '../../types';

export function createDirectory(path: string) {
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

	return directory;
}
