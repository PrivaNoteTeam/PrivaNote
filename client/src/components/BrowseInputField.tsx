import React from 'react';
import { ipcRenderer } from 'electron';

interface Props {
	name: string;
	currentPath?: string;
	liftState: (value: string) => void;
}

export function BrowseInputField({ name, currentPath = '', liftState }: Props) {
	const handleClick = async () => {
		const directory = await ipcRenderer.sendSync('selectDirectory');
		liftState(directory);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) liftState(event.target.value);
	};

	return (
		<div className='flex flex-col'>
			<label className='pn-label'>{name}</label>
			<div className='flex space-x-2'>
				<input
					value={currentPath}
					onChange={handleChange}
					className='pn-input w-full'
				/>
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
