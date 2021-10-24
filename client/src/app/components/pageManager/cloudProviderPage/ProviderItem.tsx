import React from 'react';
import { useProviderItem } from './providerItem/useProviderItem';
import { UIProviderItem } from './providerItem/UIProviderItem';
interface Props {
	active?: boolean;
	provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';
}

export function ProviderItem({ active = false, provider }: Props) {
	const { logo, handleConnect, handleDisconnect } = useProviderItem({
		active,
		provider
	});

	return (
		<>
			{active ? (
				<UIProviderItem
					provider={provider}
					logo={logo}
					handleDisconnect={handleDisconnect}
					active
				/>
			) : (
				<UIProviderItem
					provider={provider}
					logo={logo}
					handleConnect={handleConnect}
				/>
			)}
		</>
	);
}
