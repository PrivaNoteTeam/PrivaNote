import { googleDriveUpstream } from '@shared/Api/googleDrive/googleDriveUpstream';
import { getConfig } from '../getConfig';

export const syncUpstream = (
	action: string,
	content: any,
	notebook: string
) => {
	const config = getConfig(notebook);

	if (config) {
		// PRIVANOTE VAULT

		// GOOGLE DRIVE
		const googleConfig = config.connectedProviders.find((p) => {
			return p.name === 'Google Drive';
		});
		if (googleConfig) {
			googleDriveUpstream(action, content, notebook);
		}

		// ONE DRIVE
	}
};
