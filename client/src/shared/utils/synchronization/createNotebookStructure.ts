import fs from 'fs';
import p from 'path';
import { nanoid } from 'nanoid';
import mime from 'mime-types';
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
				let stats = fs.statSync(absolutePath);

				let paths: string[] = absolutePath.split(p.sep);
				paths = paths.slice(paths.indexOf(notebookName));

				let item: any = {
					id: nanoid(),
					cloudIds: [],
					name: fileName,
					paths: paths,
					dateCreated: stats.birthtime,
					lastModified: stats.mtime
				};
				if (stats.isDirectory()) {
					item.mimeType = 'Folder';
					notebookStructure.push(
						item as NotebookItem,
						...getNotebookItems(absolutePath)
					);
				} else {
					let mimeType = mime.lookup(fileName);
					if (mimeType) {
						item.mimeType = mimeType;
						notebookStructure.push(item as NotebookItem);
					}
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
			path.slice(-1) === p.sep ? path.substr(0, path.length - 1) : path;
		notebookName = path.split(p.sep).pop()!;

		let stats = fs.statSync(path);

		notebookStructure.push({
			id: nanoid(),
			cloudIds: [],
			name: notebookName,
			mimeType: 'Notebook',
			paths: [notebookName],
			dateCreated: stats.birthtime,
			lastModified: stats.ctime
		} as NotebookItem);

		notebookStructure.push(...getNotebookItems(path));
	}

	return notebookStructure as NotebookStructure;
};
