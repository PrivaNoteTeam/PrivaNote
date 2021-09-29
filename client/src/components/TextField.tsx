import React from 'react';

interface Props {
	name: string;
}

export function TextField({ name }: Props) {
	return (
		<div className='flex flex-col'>
			<label className='pn-label'>{name}</label>
			<div className='flex space-x-2'>
				<input className='pn-input w-full' />
			</div>
		</div>
	);
}
