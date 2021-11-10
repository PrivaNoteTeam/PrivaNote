import fs from 'fs';
import mime from 'mime-types';

type structure = {
	ids: {};
	name: string;
	mimeType: string;
	absolutePath: string;
	size: number;
	dateCreated: Date;
	lastModified: Date;
	subFolder?: any[];
}[];

const getSubNotebookStructure = (path: string) => {
	let notebookStructure: structure = [];

	if (path) {
		try {
			const files = fs.readdirSync(path);
			files.forEach((file) => {
				let absolutePath = `${path}/${file}`;
				let stats = fs.statSync(absolutePath);
				let item: any = {
					ids: {},
					name: file,
					absolutePath: absolutePath,
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
		path = path.slice(-1) === '/' ? path.substr(0, path.length - 1) : path;
		let name = path.split('/').pop()!;

		let stats = fs.statSync(path);

		notebookStructure = {
			ids: {},
			name: name,
			mimeType: 'Notebook',
			absolutePath: path,
			size: stats.size,
			dateCreated: stats.birthtime,
			lastModified: stats.mtime,
			statusModified: stats.ctime,
			subFolder: getSubNotebookStructure(path)
		};
	}

	return notebookStructure;
};
