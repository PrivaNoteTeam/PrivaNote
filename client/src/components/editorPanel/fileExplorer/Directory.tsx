import React, { useState } from 'react';
import { FileSystemItem } from '../../../types';
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import FolderIcon from '../../../assets/icons/folder-f.svg';
import { getFileSystemItems } from '../../../utils/getFileSystemItems';
import { Note } from './Note';

interface Props {
	item: FileSystemItem;
}

export function Directory({ item }: Props) {
	const [isOpened, setIsOpened] = useState(false);

	let childItems: FileSystemItem[] = isOpened
		? getFileSystemItems(item.path)
		: [];

	const handleClick = () => {
		setIsOpened(!isOpened);
	};

	return (
		<div>
			<div
				onClick={handleClick}
				className='flex items-center py-0.5 pl-8 select-none cursor-pointer hover:bg-gray-700'
			>
				{isOpened ? (
					<ChevronDownIcon fill='#9CA3AF' className='-ml-6' />
				) : (
					<ChevronRightIcon fill='#9CA3AF' className='-ml-6' />
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
			<div className='pl-2'>
				{childItems.map((item) => {
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
