import fs from 'fs';
import { PrivaNoteConfig } from '@types';
import { getConfig } from '@utils';

export const updateConfig = (
	path: string,
	changes: Partial<PrivaNoteConfig>
) => {
	const config = getConfig(path);

	if (!config) return; // issue

	let updatedConfig = { ...config, ...changes };

	if (!fs.existsSync(`${path}/.privanote`)) return;
	if (!fs.existsSync(`${path}/.privanote/app.json`)) return;

	fs.writeFileSync(
		path + '/.privanote/app.json',
		JSON.stringify(updatedConfig)
	);
};
