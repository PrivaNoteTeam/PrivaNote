import fs from 'fs';
import { PrivaNoteConfig } from '@types';
import { getConfig } from '@utils';

interface Options {
	add?: Partial<PrivaNoteConfig>;
	remove?: Array<keyof PrivaNoteConfig>;
}

const removeFields = (
	config: PrivaNoteConfig,
	removeKeys: Array<keyof PrivaNoteConfig>
) => {
	let configKey: keyof PrivaNoteConfig;
	let prunedConfig: PrivaNoteConfig = config;

	for (configKey in config) {
		removeKeys.forEach((rk) => {
			if (configKey !== rk) return;

			if (Array.isArray(config[configKey])) {
				(prunedConfig as unknown as any)[configKey] = [];
			} else {
				(prunedConfig as unknown as any)[configKey] = undefined;
			}
		});
	}

	return prunedConfig;
};

export const updateConfig = (path: string, options: Options) => {
	const config = getConfig(path);

	if (!config) return;

	let updatedConfig: PrivaNoteConfig = { ...config, ...options.add };

	if (options.remove) removeFields(updatedConfig, options.remove);

	if (!fs.existsSync(`${path}/.privanote`)) return;
	if (!fs.existsSync(`${path}/.privanote/app.json`)) return;

	fs.writeFileSync(
		path + '/.privanote/app.json',
		JSON.stringify(updatedConfig)
	);
};
