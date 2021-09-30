import React from 'react';

interface Props {
	text: string;
}

export function Placeholder({ text }: Props) {
	return (
		<div className='bg-gray-900 flex-grow flex flex-col'>
			<p className='text-gray-700 text-3xl font-normal justify-self-center m-auto select-none'>
				{text}
			</p>
		</div>
	);
}
