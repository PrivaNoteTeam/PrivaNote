import React from 'react';
import CloudIcon from '@assets/icons/cloud.svg';
import { useHistory } from 'react-router-dom';

interface Props {
	status: 'default' | 'error' | 'synced' | 'syncing';
}

export function CloudButton({}: Props) {
	let history = useHistory();

	const handleClick = () => {
		history.push('/cloudprovider');
	};
	return (
		<div className='text-gray-500 hover:text-gray-400 cursor-pointer'>
			<CloudIcon
				onClick={handleClick}
				className='w-8'
				width={undefined}
				height={undefined}
			/>
		</div>
	);
}
