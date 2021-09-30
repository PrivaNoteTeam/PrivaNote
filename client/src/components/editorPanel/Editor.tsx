import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { Breadcrumb } from './editor/Breadcrumb';

interface Props {
	currentFile: string;
	currentNotebook: string;
}

export function Editor({ currentNotebook, currentFile }: Props) {
	const [text, setText] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	useEffect(() => {
		let buffer = fs.readFileSync(`${currentNotebook}/${currentFile}`);
		setText(buffer.toString());
	}, [currentFile]);

	return (
		<div className='bg-gray-900 flex-grow flex flex-col'>
			<Breadcrumb currentFile={currentFile} />
			<div className='overflow-auto flex-grow w-full'>
				<textarea
					onChange={handleChange}
					value={text}
					className='w-full h-full bg-transparent outline-none border-none text-gray-200 font-mono p-8 resize-none'
				></textarea>
			</div>
		</div>
	);
}
