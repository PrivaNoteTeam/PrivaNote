import React from 'react';
import { Page } from './Page';
import { usePageStore, useConfig } from '@hooks';
import { ProviderItem } from './cloudProviderPage/ProviderItem';

export function SelectCloudProviderPage() {
	const [, pageDispatch] = usePageStore();
	const [config] = useConfig();
	const providers = config?.connectedProviders || [];
	const configProviderNames = providers.map((p) => p.name);

	const allProviders = ['PrivaNote Vault', 'Google Drive', 'OneDrive'];
	const otherProviders = allProviders.filter((ap) => {
		return !configProviderNames.includes(ap);
	});

	return (
		<Page
			onClose={() =>
				pageDispatch({
					type: 'selectCloudProviderPage',
					selectCloudProviderPageVisible: false
				})
			}
		>
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
						onClick={() => {
							pageDispatch({
								type: 'cloudProviderPage',
								cloudProviderPageVisible: true
							});
						}}
						className='pn-button bg-gray-500 bg-opacity-50 border-gray-500 hover:border-gray-400'
					>
						Go back
					</button>
				</div>
			</div>
		</Page>
	);
}
