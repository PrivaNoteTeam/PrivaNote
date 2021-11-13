import { ipcRenderer } from 'electron';
import fs from 'fs';
import p from 'path';
import { defaultConfig } from '../defaultConfig';

export const createNotebook = async (path: string) => {
	fs.mkdirSync(path);
	fs.mkdirSync(`${path}${p.sep}.privanote`);

	JSON.stringify(defaultConfig);
	// needs to be replaced with useConfig
	return new Promise<boolean>((resolve, _) => {
		try {
			fs.writeFileSync(
				`${path}${p.sep}.privanote${p.sep}app.json`,
				JSON.stringify(defaultConfig, null, 4)
			);

			fs.writeFileSync(
				`${path}${p.sep}.privanote${p.sep}notebookStructure.json`,
				''
			);

			ipcRenderer.send('setNotebook', path);
			ipcRenderer.send('addNewNotebookContentToStructure');

			resolve(true);
		} catch (err) {
			console.log(err);
		}
	});
};
