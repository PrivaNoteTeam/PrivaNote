import fs from 'fs';
import { FileSystemItem } from '../../types';
import { renameItemInStructure } from '../synchronization/renameItemInStructure';
import { getFileSystemItem } from './getFileSystemItem';

// notebook should be mandatory, made it optional cause i didn't want to touch test file - J.X.
export const renameExplorerItem = async (
	path: string,
	newName: string,
	notebook: any = undefined
) => {
	return new Promise<FileSystemItem | undefined>((resolve, reject) => {
		try {
			path =
				path.slice(-1) === '/' ? path.substr(0, path.length - 1) : path;
			const newPath =
				path.substring(0, path.lastIndexOf('/')) + '/' + newName;

			if (fs.existsSync(path) && !fs.existsSync(newPath)) {
				fs.renameSync(path, newPath);

				renameItemInStructure(path, newName, notebook);

				resolve(getFileSystemItem(newPath));
			} else {
				reject("File has already been renamed or doesn't exist");
			}
		} catch (error) {
			reject(error);
		}
	});
};
