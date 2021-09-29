import React from 'react';
import { FieldError, SetFieldValue } from 'react-hook-form';
import { ipcRenderer } from 'electron';

interface Props {
	name: string;
	error?: FieldError;
	register: any;
	setValue: SetFieldValue<any>;
}

export function BrowseInputField({
	name,
	error,
	register,
	setValue
}: Props & React.HTMLProps<HTMLInputElement>) {
	const handleClick = async () => {
		const directory = await ipcRenderer.sendSync('selectDirectory');
		setValue(name, directory, { shouldValidate: true });
	};

	return (
		<div className='flex flex-col'>
			<div className='flex justify-between'>
				<label htmlFor={name} className='pn-label'>
					{name}
				</label>
				<p className='text-red-400 text-xs uppercase'>
					{error && error.message}
				</p>
			</div>
			<div className='flex space-x-2'>
				<input
					{...register(name)}
					name={name}
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
