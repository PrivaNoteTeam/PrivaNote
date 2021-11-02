import fs from 'fs';
import { defaultConfig } from '../defaultConfig';
import { exportNotebookStructure } from '../synchronization/exportNotebookStructure';

export const createNotebook = async (path: string) => {
	fs.mkdirSync(path);
	fs.mkdirSync(`${path}/.privanote`);

	JSON.stringify(defaultConfig);
	// needs to be replaced with useConfig
	return new Promise<boolean>((resolve, _) => {
		try {
			fs.writeFile(
				`${path}/.privanote/app.json`,
				JSON.stringify(defaultConfig),
				(err) => {
					if (err) console.log(err);
				}
			);

			fs.writeFile(
				`${path}/.privanote/notebookStructure.json`,
				'',
				(err) => {
					if (err) {
						console.log(err);
					} else {
						exportNotebookStructure(path);
					}
				}
			);
			resolve(true);
		} catch (err) {
			console.log(err);
		}
	});
};
