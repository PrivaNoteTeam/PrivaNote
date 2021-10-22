import React from 'react';
import GDriveLogo from '@assets/images/google-drive.png';
import { Page } from '../Page';

interface Props {
	handleClose: () => void;
}

export function UICloudProviderPage({ handleClose }: Props) {
	return (
		<Page onClose={handleClose}>
			<div className='flex flex-col space-y-2'>
				<h1 className='text-2xl text-white select-none'>
					Cloud Storage Provider
				</h1>
				<div role='listbox' className='flex flex-col'>
					{/* Option Component */}
					<div className='flex justify-between border border-gray-700 rounded-md p-4'>
						<div className='flex space-x-4 align-baseline'>
							<div className='h-16'>
								<img
									src={GDriveLogo}
									className='w-full h-full'
									alt='google drive'
								/>
							</div>
							<div className='flex flex-col align-middle justify-center'>
								<header className='text-white text-lg'>
									Google Drive
								</header>
								<p className='text-xs text-gray-400'>
									Last synced 5 minutes ago
								</p>
							</div>
						</div>
						<div role='list' className='flex flex-col space-y-3'>
							<button className='pn-button bg-blue-500 border-blue-500 bg-opacity-50 hover:border-blue-400 text-sm'>
								Change Provider
							</button>
							<button className='pn-button bg-red-500 border-red-500 bg-opacity-50 hover:border-red-400 text-sm'>
								Delete Data
							</button>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}
