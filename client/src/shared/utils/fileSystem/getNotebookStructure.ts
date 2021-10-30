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
		fs.readdir(path, (err, files) => {
			if (err) {
				console.log(err);
			} else {
				files.forEach((file) => {
					let absolutePath = path + '/' + file;
					let stats = fs.statSync(absolutePath);
					if (stats.isDirectory()) {
						notebookStructure.push({
							name: file,
							mimeType: 'Folder',
							absolutePath: absolutePath,
							size: stats.size,
							subFolder: getNotebookStructure(path + '/' + file)
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
			}
		});
	}
	return notebookStructure;
};
