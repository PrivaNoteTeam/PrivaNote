import React from 'react';
import './theme.css';

interface Props {
	content: any;
}

export function UIPreview({ content }: Props) {
	return (
		<div className='flex flex-col w-1/2'>
			<div className='bg-gray-900 pn-drop-shadow flex py-1 px-4 z-10'>
				<p className='text-gray-500'>Live Preview</p>
			</div>
			<div
				id='wrapper'
				className='flex-grow pn-drop-shadow bg-gray-900 p-8 text-white overflow-y-auto'
			>
				{content}
			</div>
		</div>
	);
}
