import React from 'react';

interface Props {
	currentFile: string;
}

export function Breadcrumb({ currentFile }: Props) {
	return (
		<div className='bg-gray-900 pn-drop-shadow'>
			<p className='text-gray-400 py-1 px-4'>{currentFile}</p>
		</div>
	);
}
