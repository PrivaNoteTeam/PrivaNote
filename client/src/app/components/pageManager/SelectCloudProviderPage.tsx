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
				</div>
				<div role='listbox' className='flex flex-col space-y-2'>
					<ProviderItem provider='PrivaNote Vault' />
					<ProviderItem provider='Google Drive' />
					<ProviderItem provider='OneDrive' />
				</div>
			</div>
		</Page>
	);
}
