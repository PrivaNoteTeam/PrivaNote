import React from 'react';

interface Props {
	name: string;
	liftState: (value: string) => void;
}

export function TextField({ name, liftState }: Props) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		liftState(event.target.value);
	};

	return (
		<div className='flex flex-col'>
			<label className='pn-label'>{name}</label>
			<div className='flex space-x-2'>
				<input onChange={handleChange} className='pn-input w-full' />
			</div>
		</div>
	);
}
