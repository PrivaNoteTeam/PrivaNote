import React from 'react';
import { Page } from './Page';
import { usePageStore } from '@hooks';
import { ProviderItem } from './cloudProviderPage/ProviderItem';

export function SelectCloudProviderPage() {
	const [, pageDispatch] = usePageStore();
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
					<ProviderItem provider='PrivaNote Vault' />
					<ProviderItem provider='Google Drive' />
					<ProviderItem provider='OneDrive' />
				</div>
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
