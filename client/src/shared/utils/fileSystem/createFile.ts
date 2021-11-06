import { ipcRenderer } from 'electron';
import fs from 'fs';
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

	ipcRenderer.send('createFile', file.path);

	return file;
}
