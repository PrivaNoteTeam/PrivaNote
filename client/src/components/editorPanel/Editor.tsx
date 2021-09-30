import React from 'react';
import fs from 'fs';
import { Breadcrumb } from './editor/Breadcrumb';

interface Props {
	currentFile: string;
}

export function Editor({ currentFile }: Props) {
	console.log(currentFile);

	let buffer = fs.readFileSync(currentFile);

	return (
		<div className='bg-gray-900 flex-grow flex flex-col'>
			<Breadcrumb currentFile={currentFile} />
			<div className='overflow-auto flex-grow w-full'>
				<textarea
					value={buffer.toString()}
					className='w-full h-full bg-transparent outline-none border-none text-gray-200 font-mono p-8 resize-none'
				></textarea>
			</div>
		</div>
	);
}
