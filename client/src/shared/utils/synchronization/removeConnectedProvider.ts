import fs from 'fs';
import { getNotebookLocation } from '@shared/notebook';
import { getConfig } from '../getConfig';

export const removeConnectedProvider = (name: string) => {
	const notebookLocation = getNotebookLocation();
	let config = getConfig(notebookLocation);
	if (config) {
		config.connectedProviders = config.connectedProviders.filter(
			(p) => p.name !== name
		);

		fs.writeFileSync(
			`${notebookLocation}/.privanote/app.json`,
			JSON.stringify(config)
		);
	}
};
