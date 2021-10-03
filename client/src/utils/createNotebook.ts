import fs from 'fs';
import { PrivaNoteConfig } from '../types';

const defaultConfig: PrivaNoteConfig = {
	autoSave: true,
	spellCheck: true,
	dictionaryLanguage: 'en-ca',
	fontFamily: 'ui-sans-serif',
	fontSize: 14,
	tabWidth: 4,
	columns: 72
};

export const createNotebook = async (path: string) => {
	console.log('Path: ' + path);
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
