import { googleDriveUpstream } from '@shared/Api/googleDrive/googleDriveUpstream';
import { getNotebookLocation } from '@shared/notebook';
import { SyncContent, SyncType } from '@types';
import { getConfig } from '../getConfig';

export const syncUpstream = (action: SyncType, content: SyncContent) => {
	const config = getConfig(getNotebookLocation());

	if (config) {
		// PRIVANOTE VAULT

		// GOOGLE DRIVE
		const googleConfig = config.connectedProviders.find((p) => {
			return p.name === 'Google Drive';
		});
		if (googleConfig) {
			googleDriveUpstream(action, content);
		}

		// ONE DRIVE
	}
};
