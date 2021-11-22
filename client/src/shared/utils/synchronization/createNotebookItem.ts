import fs from 'fs';
import p from 'path';
import { nanoid } from 'nanoid';
import { getNotebookName } from '@shared/notebook';
import mime from 'mime-types';
import { NotebookItem } from '@types';

/** Createsa Notebook item
 * 	@param path The absolute path of the notebook item location.
 */
export const createNotebookItem = (path: string) => {
	let stats = fs.statSync(path);

	path = path.slice(-1) === p.sep ? path.substring(0, path.length - 1) : path;
	let paths: string[] = path.split(p.sep);
	paths = paths.slice(paths.indexOf(getNotebookName()));
	let fileName = paths.slice(-1)[0];

	let item: any = {
		id: nanoid(),
		cloudIds: {},
		name: fileName,
		paths: paths,
		dateCreated: stats.birthtime.toISOString(),
		lastModified: stats.mtime.toISOString()
	};
	if (stats.isDirectory()) {
		item.mimeType = 'Folder';
	} else {
		let mimeType = mime.lookup(fileName);
		if (mimeType) {
			item.mimeType = mimeType;
		}
	}
	return item as NotebookItem;
};
