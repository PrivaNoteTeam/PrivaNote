import { BrowserWindow } from 'electron';
import { FileItem } from '../../types';

export function exportNote(window: BrowserWindow, currentFile: FileItem) {
	console.log('exportNote Handler: ', currentFile);
	console.log(window);
}
