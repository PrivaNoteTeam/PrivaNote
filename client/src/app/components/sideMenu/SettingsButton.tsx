import React from 'react';
import SettingsIcon from '@assets/icons/cog.svg';
import { useHistory } from 'react-router-dom';

export function SettingsButton() {
	let history = useHistory();

	const handleClick = () => {
		history.push('/settings');
	};

	return (
		<div className='text-gray-500 hover:text-gray-400 cursor-pointer'>
			<SettingsIcon
				onClick={handleClick}
				className='w-8'
				width={undefined}
				height={undefined}
			/>
		</div>
	);
}
