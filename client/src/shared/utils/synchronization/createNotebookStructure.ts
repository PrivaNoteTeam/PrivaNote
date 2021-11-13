import fs from 'fs';
import p from 'path';
import mime from 'mime-types';

type structure = {
	ids: {};
	name: string;
	mimeType: string;
	paths: string;
	size: number;
	dateCreated: Date;
	lastModified: Date;
	subFolder?: any[];
}[];

let notebookName: any;

const getSubNotebookStructure = (path: string) => {
	let notebookStructure: structure = [];

	if (path) {
		try {
			const files = fs.readdirSync(path);
			files.forEach((file) => {
				let absolutePath = `${path}${p.sep}${file}`;
				let stats = fs.statSync(absolutePath);

				let paths: any =
					absolutePath.slice(-1) === p.sep
						? absolutePath.substr(0, absolutePath.length - 1)
						: absolutePath;
				paths = paths.split(p.sep);
				paths = paths.slice(paths.indexOf(notebookName));

				let item: any = {
					ids: {},
					name: file,
					paths: paths,
					size: stats.size,
					dateCreated: stats.birthtime,
					lastModified: stats.mtime,
					statusModified: stats.ctime
				};
				if (stats.isDirectory()) {
					item.mimeType = 'Folder';
					item.subFolder = getSubNotebookStructure(absolutePath);
					notebookStructure.push(item);
				} else {
					let mimeType = mime.lookup(file);
					if (mimeType) {
						item.mimeType = mimeType;
						notebookStructure.push(item);
					}
				}
			});
		} catch (error) {
			console.log('Error reading notebook structure\n', error);
		}
	}

	return notebookStructure;
};

export const createNotebookStructure = (path: string) => {
	let notebookStructure;

	if (path) {
		path =
			path.slice(-1) === p.sep ? path.substr(0, path.length - 1) : path;
		notebookName = path.split(p.sep).pop()!;

		let stats = fs.statSync(path);

		notebookStructure = {
			ids: {},
			name: notebookName,
			mimeType: 'Notebook',
			paths: [notebookName],
			size: stats.size,
			dateCreated: stats.birthtime,
			lastModified: stats.mtime,
			statusModified: stats.ctime,
			subFolder: getSubNotebookStructure(path)
		};
	}

	return notebookStructure;
};
