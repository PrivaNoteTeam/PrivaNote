import fs from 'fs';
import mime from 'mime-types';

type structure = {
	name: string;
	mimeType: string | false;
	absolutePath: string | false;
	size: number;
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
				if (stats.isDirectory()) {
					notebookStructure.push({
						name: file,
						mimeType: 'Folder',
						absolutePath: absolutePath,
						size: stats.size,
						subFolder: getSubNotebookStructure(absolutePath)
					});
				} else {
					notebookStructure.push({
						name: file,
						absolutePath: absolutePath,
						mimeType: mime.lookup(file),
						size: stats.size
					});
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
			name: name,
			mimeType: 'Folder',
			absolutePath: path,
			size: stats.size,
			subFolder: getSubNotebookStructure(path)
		};
	}

	return notebookStructure;
};
