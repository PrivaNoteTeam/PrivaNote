import { ipcRenderer } from 'electron';
import fs from 'fs';
import p from 'path';
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

	// crossPath is temp fix until directory.path is using path.sep
	let crossPath = directory.path.replace(/\\/g, p.sep); // replaces all '\'
	crossPath = crossPath.replace(/\//g, p.sep); // replaces all '/'
	ipcRenderer.send('createDirectory', crossPath);

	return directory;
}
