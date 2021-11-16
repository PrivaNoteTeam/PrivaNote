import { googleDriveUpstream } from '@shared/Api/googleDrive/googleDriveUpstream';
import { getNotebookLocation } from '@shared/notebook';
import { getConfig } from '../getConfig';

export const syncUpstream = (action: string, content: any) => {
	const config = getConfig(getNotebookLocation());

	if (config) {
		// PRIVANOTE VAULT

		// GOOGLE DRIVE
		const googleConfig = config!['cloud.connectedProviders'].find((p) => {
			return p.name === 'Google Drive';
		});
		if (googleConfig) {
			googleDriveUpstream(action, content);
		}

		// ONE DRIVE
	}
};
