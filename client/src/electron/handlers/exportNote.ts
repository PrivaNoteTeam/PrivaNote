import { BrowserWindow, dialog } from 'electron';
import { FileItem } from '../../shared/types';
import fs from 'fs';

export function exportNote(window: BrowserWindow, currentFile: FileItem) {
	dialog
		.showSaveDialog(window, {
			defaultPath: currentFile.name.split('.')[0],
			filters: [
				{ name: 'PDF', extensions: ['.pdf'] },
				{ name: 'HTML', extensions: ['.html'] }
			]
		})
		.then((result) => {
			// TEMPORARY EXPORT, will be fixed in Markdown Parsing milestone
			// FIX: MUST PARSE MARKDOWN TO HTML THEN PDF
			if (result.canceled || !result.filePath) return;
			fs.copyFile(currentFile.path, result.filePath, (err) => {
				if (err) {
					alert(currentFile + ' could not be exported.');
					return;
				}
			});
		});
}
