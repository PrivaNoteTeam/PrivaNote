import React, { useState } from 'react';
import { FileSystemItem } from '../../../types';
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import FolderIcon from '../../../assets/icons/folder-f.svg';

interface Props {
	item: FileSystemItem;
}

export function Directory({ item }: Props) {
	const [isOpened, _] = useState(false);

	return (
		<div className='flex items-center py-0.5 pl-8 select-none cursor-pointer hover:bg-gray-700'>
			{isOpened ? (
				<></>
			) : (
				<ChevronRightIcon fill='#9CA3AF' className='absolute -ml-6' />
			)}
			<FolderIcon fill='#9CA3AF' className='self-end w-5 mr-1' />
			<p
				className={`${
					isOpened ? 'text-white' : 'text-gray-300'
				} text-sm`}
			>
				{item.name}
			</p>
		</div>
	);
}
