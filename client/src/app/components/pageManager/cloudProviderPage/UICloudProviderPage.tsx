import React from 'react';
import { ProviderItem } from './ProviderItem';
import { Page } from '../Page';
import { useConfig } from '@hooks';
import { useHistory } from 'react-router';

interface Props {
	handleClose: () => void;
}

export function UICloudProviderPage({ handleClose }: Props) {
	const [config] = useConfig();
	let history = useHistory();

	const placeholder = (
		<div className='text-gray-500 text-sm flex flex-col space-y-1 w-2/3'>
			<p className='font-semibold text-gray-400'>
				Why should I synchronize my notes?
			</p>
			<p>
				Synchronizing your notes will give you the following benefits:
			</p>
			<ul className='list-disc ml-8 flex flex-col space-y-1'>
				<li>Seamlessly access your notes from across devices</li>
				<li>Back-up your notes so nothing is ever lost</li>
				<li>
					<span className='inline-flex center bg-opacity-50 items-center bg-gray-900 rounded-md text-xs font-bold text-green-300 py-1 px-2 uppercase mr-2'>
						vault exclusive
					</span>
					End to end encryption so no government, company, nor
					individual can read your privacy sensitive notes. That's
					right, not even us...
				</li>
			</ul>
		</div>
	);

	const providers = config!['cloud.connectedProviders'] || [];

	const renderProviders = providers?.map((p) => {
		return (
			<ProviderItem
				provider={
					p.name as 'Google Drive' | 'OneDrive' | 'PrivaNote Vault'
				}
				active
			/>
		);
	});

	return (
		<Page onClose={handleClose}>
			<div className='flex flex-col space-y-6'>
				<div>
					<h1 className='text-2xl text-white select-none'>
						Cloud Storage Provider
					</h1>
				</div>
				{renderProviders?.length != 0 ? renderProviders : placeholder}
				<div className='flex justify-end'>
					<button
						onClick={() => history.push('/cloudprovider/select')}
						className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
					>
						See providers
					</button>
				</div>
			</div>
		</Page>
	);
}
