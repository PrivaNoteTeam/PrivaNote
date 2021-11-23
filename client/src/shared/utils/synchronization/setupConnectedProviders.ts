import { getConfig } from '../getConfig';
import { getNotebookLocation } from '@shared/notebook';
import { isConnected as isVaultUserConnected, initializeVault } from '@vault';
import {
	isConnected,
	setGoogleAuth,
	initializeGoogleDrive
} from '@googleDrive';
import { removeConnectedProvider } from '@synchronization';

export const setupConnectedProviders = async () => {
	const config = getConfig(getNotebookLocation());
	if (config) {
		// PRIVANOTE VAULT
		const vaultConfig = config['cloud.connectedProviders'].find((p) => {
			return p.name === 'PrivaNote Vault';
		});
		if (vaultConfig) {
			if (await isVaultUserConnected()) {
				initializeVault();
			} else {
				removeConnectedProvider('PrivaNote Vault');
			}
		}

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
