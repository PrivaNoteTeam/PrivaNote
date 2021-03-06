import React from 'react';
import ShieldCheck from '@assets/icons/shield-check-f.svg';

interface Props {
	provider: 'Google Drive' | 'OneDrive' | 'PrivaNote Vault';
	logo: string;
	handleConnect?: () => void;
	handleDisconnect?: () => void;
	active?: boolean;
}

export function UIProviderItem({
	logo,
	provider,
	handleConnect,
	handleDisconnect,
	active = false
}: Props) {
	return (
		<div
			key={provider}
			className='flex justify-between border border-gray-700 rounded-md p-4'
		>
			<div className='flex space-x-4 align-baseline'>
				<div className='h-16 flex-shrink-0'>
					<img
						src={logo}
						className='w-full h-full select-none'
						draggable={false}
						alt='google drive'
					/>
				</div>
				<div className='flex flex-col align-middle justify-center'>
					<div className='flex space-x-2'>
						<header className='text-white text-lg'>
							{provider}
						</header>
						{provider === 'PrivaNote Vault' && (
							<ShieldCheck className='text-green-400' />
						)}
					</div>
					<p className='text-xs text-gray-400'>
						Last synced 5 minutes ago
					</p>

					{provider === 'PrivaNote Vault' && (
						<div className='text-gray-500 text-sm overflow-ellipsis mt-2'>
							<header className='text-white text-md'>
								Why you should choose PrivaNote Vault
							</header>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Voluptate fuga maiores nostrum
								consectetur tenetur debitis neque numquam,
								obcaecati facilis? Veritatis consectetur aliquam
								debitis doloremque consequuntur voluptate ut
								nulla error deserunt.
							</p>
						</div>
					)}
				</div>
			</div>
			<div role='list' className='flex flex-col justify-center'>
				{!active ? (
					<button
						onClick={handleConnect}
						className='pn-button bg-blue-500 border-blue-500 bg-opacity-50 hover:border-blue-400 text-sm'
					>
						Connect
					</button>
				) : (
					<button
						onClick={handleDisconnect}
						className='pn-button bg-red-500 border-red-500 bg-opacity-50 hover:border-red-400 text-sm'
					>
						Disconnect
					</button>
				)}
			</div>
		</div>
	);
}
