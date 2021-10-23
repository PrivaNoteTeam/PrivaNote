import React from 'react';
import { UIProviderItemActive } from './providerItem/UIProviderItemActive';
import { useProviderItem } from './providerItem/useProviderItem';
import { UIProviderItem } from './providerItem/UIProviderItem';
interface Props {
	active?: boolean;
	provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';
}

export function ProviderItem({ active = false, provider }: Props) {
	const { logo, handleChangeProvider, handleSetProvider } = useProviderItem({
		active,
		provider
	});

	return active ? (
		<UIProviderItemActive
			provider={provider}
			logo={logo}
			onChangeProvider={handleChangeProvider!}
		/>
	) : (
		<UIProviderItem
			provider={provider}
			handleSetProvider={handleSetProvider}
			logo={logo}
		/>
	);
}
