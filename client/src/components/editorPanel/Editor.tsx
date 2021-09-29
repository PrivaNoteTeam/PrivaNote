import React from 'react';
import { Breadcrumb } from './editor/Breadcrumb';

interface Props {
	currentFile: string;
}

export function Editor({ currentFile }: Props) {
	return (
		<div className='bg-gray-900 flex-grow flex flex-col'>
			<Breadcrumb currentFile={currentFile} />
			<div className='overflow-auto flex-grow w-full'>
				<textarea className='w-full h-full bg-transparent outline-none border-none text-gray-200 font-mono p-8 resize-none'></textarea>
			</div>
		</div>
	);
}
