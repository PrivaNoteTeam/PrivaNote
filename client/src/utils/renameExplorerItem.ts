import fs from 'fs';
import { FileSystemItem } from 'src/types';
import { getFileSystemItem } from './getFileSystemItem';

export const renameExplorerItem = async (path: string, newName: string) => {
	return new Promise<FileSystemItem | undefined>((resolve, _) => {
		const newPath =
			path.substring(0, path.lastIndexOf('/')) + '/' + newName;
		fs.rename(path, newPath, () => resolve(getFileSystemItem(newPath)));
	});
};
