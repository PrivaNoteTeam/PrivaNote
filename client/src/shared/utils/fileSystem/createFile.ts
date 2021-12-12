import { ipcRenderer } from 'electron';
import fs from 'fs';
import p from 'path';
import { FileItem } from '../../types';

export function createFile(path: string) {
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

	// crossPath is temp fix until directory.path is using path.sep
	let crossPath = file.path.replace(/\\/g, p.sep); // replaces all '\'
	crossPath = crossPath.replace(/\//g, p.sep); // replaces all '/'
	ipcRenderer.send('createFile', crossPath);

	return file;
}
