import { useConfig, useStore } from '@hooks';
import GoogleDriveLogo from '@assets/images/google-drive.png';
import OneDriveLogo from '@assets/images/onedrive.png';
import VaultLogo from '@assets/images/vault.png';
import { ConfigDispatch } from '@types';
import { getGoogleAuth } from '@shared/api/getGoogleAuth';
import { useHistory } from 'react-router-dom';

type SupportedProvider = 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';

interface Args {
	active: boolean;
	provider: SupportedProvider;
}

export function useProviderItem({ active, provider }: Args) {
	const [, configDispatch] = useConfig();
	const [{ notebook }] = useStore();
	let history = useHistory();

	return {
		logo: getLogo(provider),
		...getHandlers(history, configDispatch, active, provider, notebook!) // notebook could be null
	};
}

function getHandlers(
	history: any,
	configDispatch: ConfigDispatch,
	active: boolean,
	providerName: string,
	notebook: string
) {
	return active
		? {
				handleDisconnect: () => {
					let result = confirm(
						`Are you sure you want to disconnect ${providerName}?`
					);

					result &&
						configDispatch({
							type: 'REMOVE_PROVIDER',
							payload: { providerName, path: notebook }
						});
				},
				handleChangeProvider: () => {
					history.push('/cloudprovider/select');
				}
		  }
		: {
				handleConnect: () => {
					let result = confirm(
						'Are you sure you want to set up ' + providerName + '?'
					);

					if (!result) return;

					switch (providerName as SupportedProvider) {
						case 'Google Drive':
							getGoogleAuth();
							break;
						default:
							configDispatch({
								type: 'ADD_PROVIDER',
								payload: {
									providerName,
									path: notebook
								}
							});
					}
				}
		  };
}

function getLogo(provider: SupportedProvider) {
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
