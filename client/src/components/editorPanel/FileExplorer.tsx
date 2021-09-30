import React from 'react';
import { FileSystemItem } from '../../types';
import { Directory } from './fileExplorer/Directory';
import { Note } from './fileExplorer/Note';

interface Props {
	items: FileSystemItem[];
	currentNotebook: string;
}

export function FileExplorer({ items, currentNotebook }: Props) {
	return (
		<div className='bg-gray-800 pt-2 flex flex-col'>
			<p className='text-gray-500 text-sm font-bold px-3 py-1'>
				{currentNotebook}
			</p>
			<div className='flex-grow overflow-y-scroll'>
				{items.map((item) => {
					return item.type === 'directory' ? (
						<Directory item={item} />
					) : (
						<Note item={item} />
					);
				})}
			</div>
		</div>
	);
}
