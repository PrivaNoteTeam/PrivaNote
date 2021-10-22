import React from 'react';
import SettingsIcon from '@assets/icons/cog.svg';

export function SettingsButton() {
	return (
		<div className='text-gray-500 hover:text-gray-400 cursor-pointer'>
			<SettingsIcon
				className='w-8'
				width={undefined}
				height={undefined}
			/>
		</div>
	);
}
