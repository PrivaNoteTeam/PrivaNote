import { usePageStore } from '@hooks';
import GoogleDriveLogo from '@assets/images/google-drive.png';
import OneDriveLogo from '@assets/images/onedrive.png';
import VaultLogo from '@assets/images/vault.png';
import { PageManagerAction } from '@types';

interface Args {
	active: boolean;
	provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';
}

export function useProviderItem({ active, provider }: Args) {
	const [, pageDispatch] = usePageStore();

	return {
		logo: getLogo(provider),
		...getHandlers(pageDispatch, active)
	};
}

function getHandlers(
	pageDispatch: React.Dispatch<PageManagerAction>,
	active: boolean
) {
	return active
		? {
				handleDeleteData: () => {},
				handleChangeProvider: () => {
					pageDispatch({
						type: 'selectCloudProviderPage',
						selectCloudProviderPageVisible: true
					});
				}
		  }
		: {
				handleSetProvider: () => {}
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
