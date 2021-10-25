import { useConfig, usePageStore, useStore } from '@hooks';
import GoogleDriveLogo from '@assets/images/google-drive.png';
import OneDriveLogo from '@assets/images/onedrive.png';
import VaultLogo from '@assets/images/vault.png';
import { PageManagerAction, ConfigDispatch } from '@types';

interface Args {
	active: boolean;
	provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';
}

export function useProviderItem({ active, provider }: Args) {
	const [, pageDispatch] = usePageStore();
	const [, configDispatch] = useConfig();
	const [{ notebook }] = useStore();

	return {
		logo: getLogo(provider),
		...getHandlers(
			pageDispatch,
			configDispatch,
			active,
			provider,
			notebook!
		) // notebook could be null
	};
}

function getHandlers(
	pageDispatch: React.Dispatch<PageManagerAction>,
	configDispatch: ConfigDispatch,
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

					result &&
						configDispatch({
							type: 'REMOVE_PROVIDER',
							payload: { provider, path: notebook }
						});
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

					result &&
						configDispatch({
							type: 'ADD_PROVIDER',
							payload: { provider, path: notebook }
						});
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
