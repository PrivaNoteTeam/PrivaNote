import { getConfig } from '../getConfig';
import { getNotebookLocation } from '@shared/notebook';
import { isConnected, setGoogleAuth } from '@shared/Api/googleDrive/setup';
import { removeConnectedProvider } from './removeConnectedProvider';
import { dialog } from 'electron';

export const setupConnectedProviders = async () => {
	const config = getConfig(getNotebookLocation());
	if (config) {
		// PRIVANOTE VAULT

		// GOOGLE DRIVE
		const googleConfig = config.connectedProviders.find((p) => {
			return p.name === 'Google Drive';
		});
		if (googleConfig) {
			setGoogleAuth({ access_token: googleConfig.accessToken }); // should be/include refresh token if exist

			if (await isConnected()) {
				// start syncing
			} else {
				removeConnectedProvider('Google Drive');
				dialog.showMessageBox({
					message:
						'Google Drive connection is lost. Please reconnect to start syncing again.'
				});
			}
		}

		// ONE DRIVE
	}
};
