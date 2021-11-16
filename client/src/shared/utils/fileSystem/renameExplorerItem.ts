import { ipcRenderer } from 'electron';
import fs from 'fs';
import p from 'path';
import { getFileSystemItem } from '..';
import { FileSystemItem } from '../../types';

export const renameExplorerItem = async (path: string, newName: string) => {
	return new Promise<FileSystemItem | undefined>((resolve, reject) => {
		try {
			path =
				path.slice(-1) === '/' ? path.substr(0, path.length - 1) : path;
			const newPath =
				path.substring(0, path.lastIndexOf('/')) + '/' + newName;

			if (fs.existsSync(path) && !fs.existsSync(newPath)) {
				fs.renameSync(path, newPath);

				// crossPath is temp fix until path is using path.sep
				let crossPath = path.replace(/\\/g, p.sep); // replaces all '\'
				crossPath = crossPath.replace(/\//g, p.sep); // replaces all '/'
				ipcRenderer.send('renameExplorerItem', crossPath, newName);

				resolve(getFileSystemItem(newPath));
			} else {
				reject("File has already been renamed or doesn't exist");
			}
		} catch (error) {
			reject(error);
		}
	});
};
