import React from 'react';

interface Props {
	provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';
	logo: string;
	onChangeProvider: () => void;
}

export function UIProviderItemActive({
	logo,
	provider,
	onChangeProvider
}: Props) {
	return (
		<div className='flex justify-between border border-gray-700 rounded-md p-4'>
			<div className='flex space-x-4 align-baseline'>
				<div className='h-16'>
					<img
						src={logo}
						className='w-full h-full select-none'
						draggable={false}
						alt='google drive'
					/>
				</div>
				<div className='flex flex-col align-middle justify-center'>
					<header className='text-white text-lg'>{provider}</header>
					<p className='text-xs text-gray-400'>
						Last synced 5 minutes ago
					</p>
				</div>
			</div>
			<div role='list' className='flex flex-col space-y-3'>
				<button
					onClick={onChangeProvider}
					className='pn-button bg-blue-500 border-blue-500 bg-opacity-50 hover:border-blue-400 text-sm'
				>
					Change Provider
				</button>
				<button className='pn-button bg-red-500 border-red-500 bg-opacity-50 hover:border-red-400 text-sm'>
					Delete Data
				</button>
			</div>
		</div>
	);
}
