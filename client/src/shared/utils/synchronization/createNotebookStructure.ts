import fs from 'fs';
import p from 'path';
import { nanoid } from 'nanoid';
import { createNotebookItem } from '@synchronization';
import { NotebookItem, NotebookStructure } from '@types';

let notebookName: string;
let notebookStructure: NotebookStructure;

const getNotebookItems = (path: string) => {
	let notebookStructure: NotebookStructure = [];

	if (path) {
		try {
			const files = fs.readdirSync(path);
			files.forEach((fileName) => {
				let absolutePath = `${path}${p.sep}${fileName}`;

				let item = createNotebookItem(absolutePath);

				if (item.mimeType === 'Folder') {
					notebookStructure.push(
						item,
						...getNotebookItems(absolutePath)
					);
				} else {
					notebookStructure.push(item);
				}
			});
		} catch (error) {
			console.log('Error reading notebook structure\n', error);
		}
	}

	return notebookStructure;
};

/** Creates and returns a notebook structure.
 * 	@param path The absolute path of the notebook
 */
export const createNotebookStructure = (path: string) => {
	if (path) {
		notebookStructure = [];
		path =
			path.slice(-1) === p.sep
				? path.substring(0, path.length - 1)
				: path;
		notebookName = path.split(p.sep).pop()!;

		let stats = fs.statSync(path);

		notebookStructure.push({
			id: nanoid(),
			cloudIds: {},
			name: notebookName,
			mimeType: 'Notebook',
			paths: [notebookName],
			dateCreated: stats.birthtime.toISOString(),
			lastModified: stats.ctime.toISOString()
		} as NotebookItem);

		notebookStructure.push(...getNotebookItems(path));
	}

	return notebookStructure as NotebookStructure;
};
