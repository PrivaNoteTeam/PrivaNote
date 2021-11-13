import { ipcRenderer } from 'electron';
import fs from 'fs';
import p from 'path';
import { FileItem } from '../../types';

export function saveFile(file: FileItem, content: string) {
	fs.writeFileSync(file.path, content);

	// crossPath is temp fix until file.path is using path.sep
	let crossPath = file.path.replace(/\\/g, p.sep); // replaces all '\'
	crossPath = crossPath.replace(/\//g, p.sep); // replaces all '/'
	ipcRenderer.send('saveFile', crossPath);
}
