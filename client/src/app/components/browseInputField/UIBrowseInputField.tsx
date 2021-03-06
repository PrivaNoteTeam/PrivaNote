import React from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
	name: string;
	register: any;
	error?: FieldError;
	handleClick: () => Promise<void>;
}

export function UIBrowseInputField({
	name,
	error,
	register,
	handleClick
}: Props) {
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
