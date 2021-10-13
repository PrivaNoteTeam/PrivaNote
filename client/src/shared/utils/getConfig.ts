import fs from 'fs';
import { PrivaNoteConfig } from '../types';
import { defaultConfig } from './defaultConfig';

const isConfig = (value: unknown) => {
	let k: keyof PrivaNoteConfig;

	for (k in defaultConfig) {
		// warning: if we add an optional field to config at some point in the future, will this code always return isConfig as false?
		if ((value as PrivaNoteConfig)[k] === undefined) {
			return false;
		}
	}

	return true;
};

/** Gets the user's configuration from the PrivaNote configuration file.
 * @param path The notebook path
 */

export const getConfig = (path: string): PrivaNoteConfig | undefined => {
	if (!fs.existsSync(`${path}/.privanote`)) return;
	if (!fs.existsSync(`${path}/.privanote/app.json`)) return;

	const content = JSON.parse(
		fs.readFileSync(`${path}/.privanote/app.json`).toString()
	);

	if (!isConfig(content)) return;

	return content as unknown as PrivaNoteConfig;
};
