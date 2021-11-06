import { ipcRenderer } from 'electron';
import fs from 'fs';
import { FileItem } from '../../types';

export function saveFile(file: FileItem, content: string) {
	fs.writeFileSync(file.path, content);
	ipcRenderer.send('saveFile', file.path);
}
