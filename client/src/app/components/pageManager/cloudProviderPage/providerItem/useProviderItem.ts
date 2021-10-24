import { usePageStore, useStore } from '@hooks';
import GoogleDriveLogo from '@assets/images/google-drive.png';
import OneDriveLogo from '@assets/images/onedrive.png';
import VaultLogo from '@assets/images/vault.png';
import { PageManagerAction } from '@types';
import { updateConfig } from '@utils';

interface Args {
	active: boolean;
	provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';
}

export function useProviderItem({ active, provider }: Args) {
	const [, pageDispatch] = usePageStore();
	const [{ notebook }] = useStore();

	return {
		logo: getLogo(provider),
		...getHandlers(pageDispatch, active, provider, notebook!) // notebook could be null
	};
}

function getHandlers(
	pageDispatch: React.Dispatch<PageManagerAction>,
	active: boolean,
	provider: string,
	notebook: string
) {
	return active
		? {
				handleDisconnect: () => {
					let result = confirm(
						`Are you sure you want to disconnect ${provider}?`
					);

					if (result) {
						updateConfig(notebook, {
							remove: ['connectedProviders']
						});
					}
				},
				handleChangeProvider: () => {
					pageDispatch({
						type: 'selectCloudProviderPage',
						selectCloudProviderPageVisible: true
					});
				}
		  }
		: {
				handleConnect: () => {
					let result = confirm(
						'Are you sure you want to set up ' + provider + '?'
					);
					if (result) {
						updateConfig(notebook, {
							add: {
								connectedProviders: [provider]
							}
						});
					}
				}
		  };
}

function getLogo(provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault') {
	let logo: string;

	switch (provider) {
		case 'Google Drive':
			logo = GoogleDriveLogo;
			break;
		case 'OneDrive':
			logo = OneDriveLogo;
			break;
		case 'PrivaNote Vault':
			logo = VaultLogo;
			break;
	}

	return logo;
}
