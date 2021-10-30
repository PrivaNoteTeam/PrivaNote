import React from 'react';
import { useStore } from '@hooks';
import { FileSystemItem } from '@types';
import { getFileName } from '@shared/utils';
import PlusIcon from '@assets/icons/plus.svg';
import FolderOpenIcon from '@assets/icons/folder-open.svg';
import { Node } from './Node';

interface Props {
	items: FileSystemItem[];
	handleAddFileClick: () => void;
	handleAddDirectoryClick: () => void;
	handleOuterClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function UIFileExplorer({
	items,
	handleAddFileClick,
	handleAddDirectoryClick,
	handleOuterClick
}: Props) {
	const [{ notebook }] = useStore();

	return (
		<div className='bg-gray-800 pt-2 flex flex-col resize-x h-full w-full'>
			<div className='flex justify-between'>
				<p className='text-gray-500 text-sm font-bold px-3 py-1 select-none'>
					{getFileName(notebook!)}
				</p>
				<div className='mx-2 flex space-x-1'>
					<PlusIcon
						onClick={handleAddFileClick}
						fill='#9CA3AF'
						className='p-0.5 hover:bg-gray-700 rounded-md cursor-pointer'
					/>
					<FolderOpenIcon
						onClick={handleAddDirectoryClick}
						fill='#9CA3AF'
						className='p-0.5 hover:bg-gray-700 rounded-md cursor-pointer'
					/>
				</div>
			</div>
			<div
				onClick={handleOuterClick}
				className='flex-grow overflow-y-scroll pb-6 min-w-max'
			>
				{items.map((item) => (
					<Node item={item} />
				))}
			</div>
		</div>
	);
}
