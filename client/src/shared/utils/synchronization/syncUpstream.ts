import { googleDriveUpstream } from '@shared/Api/googleDrive/googleDriveUpstream';
import { vaultUpstream } from '@vault';
import { getNotebookLocation } from '@shared/notebook';
import { SyncContent, SyncType } from '@types';
import { getConfig } from '../getConfig';

export const syncUpstream = (action: SyncType, content: SyncContent) => {
	const config = getConfig(getNotebookLocation());

	if (config) {
		console.log('START SYNC UI LOADER');
		// PRIVANOTE VAULT
		const vaultConfig = config!['cloud.connectedProviders'].find((p) => {
			return p.name === 'PrivaNote Vault';
		});
		if (vaultConfig) {
			vaultUpstream(action, content);
		}

		// GOOGLE DRIVE
		const googleConfig = config!['cloud.connectedProviders'].find((p) => {
			return p.name === 'Google Drive';
		});
		if (googleConfig) {
			googleDriveUpstream(action, content);
		}

		// ONE DRIVE
		console.log('STOP SYNC UI LOADER');
	}
};
