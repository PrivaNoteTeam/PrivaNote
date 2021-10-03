import fs from 'fs';
import { FileSystemItem } from '../types';

/** Gets the immediate files and directories of the supplied path
 * @param path The absolute path of the targetted directory
 */

export const getFileSystemItems = (path: string): FileSystemItem[] => {
	const itemNames = fs.readdirSync(path);

	return itemNames
		.filter(
			(name) =>
				(fs.statSync(`${path}/${name}`).isDirectory() ||
					name.endsWith('.md')) &&
				!name.startsWith('.')
		)
		.map((name) => {
			const data = fs.statSync(`${path}/${name}`);

			return {
				name,
				path: `${path}/${name}`,
				type: data.isDirectory() ? 'directory' : 'note'
			};
		})
		.sort((a, b) => {
			if (a.type === b.type)
				return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;

			return a.type > b.type ? 1 : -1;
		}) as FileSystemItem[];
};
