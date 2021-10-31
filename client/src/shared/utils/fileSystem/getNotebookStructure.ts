import fs from 'fs';
import mime from 'mime-types';

export const getNotebookStructure = (path: string) => {
	let notebookStructure: {
		name: string;
		mimeType: string | false;
		absolutePath: string | false;
		size: number;
		subFolder?: any[];
	}[] = [];

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
						subFolder: getNotebookStructure(absolutePath)
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
