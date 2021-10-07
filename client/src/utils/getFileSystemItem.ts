import fs from 'fs';
import { FileSystemItem } from '../types';

/** Returns the path as a FileSystemItem type
 * @param path The absolute path of the targetted directory/file
 */

export const getFileSystemItem = (path: string): FileSystemItem | undefined => {
	if (fs.existsSync(path)) {
		return {
			name: path.split('/').pop(),
			path: path,
			type: fs.statSync(path).isDirectory() ? 'directory' : 'note'
		} as FileSystemItem;
	}
	return undefined;
};
