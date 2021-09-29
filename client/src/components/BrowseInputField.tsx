import React from 'react';
import { ipcRenderer } from 'electron';

interface Props {
	name: string;
}

export function BrowseInputField({ name }: Props) {
	const handleClick = () => {
		ipcRenderer.send('selectDirectory');
	};

	return (
		<div className='flex flex-col'>
			<label className='pn-label'>{name}</label>
			<div className='flex space-x-2'>
				<input className='pn-input w-full' />
				<button
					onClick={handleClick}
					className='pn-button pn-dark-button'
				>
					...
				</button>
			</div>
		</div>
	);
}
