import fs from 'fs';
import { defaultConfig } from '../defaultConfig';

export const createNotebook = async (path: string) => {
	fs.mkdirSync(path);
	fs.mkdirSync(`${path}/.privanote`);

	JSON.stringify(defaultConfig);

	return new Promise<boolean>((resolve, _) => {
		fs.writeFile(
			`${path}/.privanote/app.json`,
			JSON.stringify(defaultConfig),
			(err) => resolve(!err)
		);
	});
};
