import fs from 'fs';
import { getNotebookLocation } from '@shared/notebook';
import { getConfig } from '../getConfig';
import { dialog } from 'electron';
import { getMainWindow } from '@electron/windows';

export const removeConnectedProvider = (name: string) => {
	let mainWindow = getMainWindow();
	const notebookLocation = getNotebookLocation();
	let config = getConfig(notebookLocation);
	if (config) {
		config.connectedProviders = config.connectedProviders.filter(
			(p) => p.name !== name
		);

		fs.writeFileSync(
			`${notebookLocation}/.privanote/app.json`,
			JSON.stringify(config, null, 4)
		);

		dialog.showMessageBox({
			message: `${name} connection is lost. Please reconnect to start syncing again.`
		});

		mainWindow.webContents.send('removeCloudProvider', name);
	}
};
