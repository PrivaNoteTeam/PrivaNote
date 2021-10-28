import fs from 'fs';
import { FileSystemItem, FileSystemItemType } from '../../types';

/** Gets the immediate files and directories of the supplied path
 * @param path The absolute path of the targetted directory
 */

export const getFileSystemItems = (path: string): FileSystemItem[] => {
	const itemNames = fs.readdirSync(path);

	return itemNames
		.filter((name) => !name.startsWith('.'))
		.map((name) => {
			const data = fs.statSync(`${path}/${name}`);

			let type: FileSystemItemType;
			if (data.isDirectory()) {
				type = 'directory';
			} else if (name.endsWith('.md')) {
				type = 'note';
			} else {
				type = 'attachment';
			}

			return {
				name,
				path: `${path}/${name}`,
				type
			};
		})
		.sort((a, b) => {
			if (a.type === b.type)
				return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;

			return a.type > b.type ? 1 : -1;
		}) as FileSystemItem[];
};
