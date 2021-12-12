import fs from 'fs';
import path from 'path';
import { getNotebookLocation } from '@shared/notebook';
import { getConfig } from '../getConfig';
import { dialog } from 'electron';
import { getMainWindow } from '@electron/windows';

type acceptedProviders = 'Google Drive' | 'PrivaNote Vault' | 'One Drive';

export const removeConnectedProvider = (name: acceptedProviders) => {
	let mainWindow = getMainWindow();
	const notebookLocation = getNotebookLocation();
	let config = getConfig(notebookLocation);
	if (config) {
		config['cloud.connectedProviders'] = config[
			'cloud.connectedProviders'
		].filter((p) => p.name !== name);

		fs.writeFileSync(
			path.join(notebookLocation, '.privanote', 'app.json'),
			JSON.stringify(config, null, 4)
		);

		dialog.showMessageBox({
			message: `${name} connection is lost. Please reconnect to start syncing again.`
		});

		mainWindow.webContents.send('removeCloudProvider', name);
	}
};
