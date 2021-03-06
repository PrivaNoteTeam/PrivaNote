import React from 'react';
import { Page } from './Page';
import { useConfig } from '@hooks';
import { ProviderItem } from './cloudProviderPage/ProviderItem';
import { useHistory } from 'react-router';

export function SelectCloudProviderPage() {
	const [config] = useConfig();
	let history = useHistory();

	const providers = config!['cloud.connectedProviders'] || [];
	const configProviderNames = providers.map((p) => p.name);

	const allProviders = ['PrivaNote Vault', 'Google Drive', 'OneDrive'];
	const otherProviders = allProviders.filter((ap) => {
		return !configProviderNames.includes(ap);
	});

	return (
		<Page onClose={() => history.push('/')}>
			<div className='flex flex-col space-y-6'>
				<div>
					<h1 className='text-2xl text-white select-none'>
						Select a cloud storage provider
					</h1>
					<p className='text-gray-500'>
						Choose from a variety of supported cloud providers,
						including our{' '}
						<span className='text-gray-400'>PrivaNote Vault</span>.
					</p>
				</div>
				<div role='listbox' className='flex flex-col space-y-4'>
					{otherProviders.map((p) => (
						<ProviderItem provider={p as unknown as any} />
					))}
				</div>
				{providers.length !== 0 && (
					<div>
						<h2 className='text-white mb-2 text-xl select-none'>
							Connected providers
						</h2>
						<div role='listbox' className='flex flex-col space-y-4'>
							{providers.map((p) => (
								<ProviderItem
									provider={p.name as unknown as any}
									active
								/>
							))}
						</div>
					</div>
				)}
				<div className='flex justify-end'>
					<button
						onClick={() => history.push('/cloudprovider')}
						className='pn-button bg-gray-500 bg-opacity-50 border-gray-500 hover:border-gray-400'
					>
						Go back
					</button>
				</div>
			</div>
		</Page>
	);
}
