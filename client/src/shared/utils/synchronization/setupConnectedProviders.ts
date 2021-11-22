import { getConfig } from '../getConfig';
import { getNotebookLocation } from '@shared/notebook';
import { isConnected, setGoogleAuth } from '@shared/Api/googleDrive/setup';
import { removeConnectedProvider } from '@synchronization';
import { initializeGoogleDrive } from '@shared/Api/googleDrive/initializeGoogleDrive';

export const setupConnectedProviders = async () => {
	const config = getConfig(getNotebookLocation());
	if (config) {
		// PRIVANOTE VAULT

		// GOOGLE DRIVE
		const googleConfig = config['cloud.connectedProviders'].find((p) => {
			return p.name === 'Google Drive';
		});
		if (googleConfig) {
			try {
				setGoogleAuth({ access_token: googleConfig.accessToken }); // should be/include refresh token if exist

				if (await isConnected()) {
					// start syncing
					initializeGoogleDrive();
				} else {
					removeConnectedProvider('Google Drive');
				}
			} catch (error) {
				console.log(error);
				removeConnectedProvider('Google Drive');
			}
		}

		// ONE DRIVE
	}
};
