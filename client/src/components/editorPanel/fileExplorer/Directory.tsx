import React, { useState } from 'react';
import { FileSystemItem, FileItem } from '../../../types';
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import FolderIcon from '../../../assets/icons/folder-f.svg';
import { getFileSystemItems } from '../../../utils/getFileSystemItems';
import { Note } from './Note';

interface Props {
	item: FileSystemItem;
	depth?: number;
	currentFile?: FileItem;
	setCurrentFile: React.Dispatch<FileItem>;
	selection?: FileSystemItem;
	setSelection: React.Dispatch<FileSystemItem>;
}

export function Directory({
	item,
	depth = 0,
	currentFile,
	setCurrentFile,
	selection,
	setSelection
}: Props) {
	const [isOpened, setIsOpened] = useState(false);

	let childItems: FileSystemItem[] = isOpened
		? getFileSystemItems(item.path)
		: [];

	const handleClick = () => {
		setSelection(item);
		setIsOpened(!isOpened);
	};

	let style = '';

	if (selection?.path === item.path) {
		style =
			'bg-blue-500 border-blue-300 border bg-opacity-30 border-opacity-30';
	} else {
		style = 'hover:bg-opacity-30 hover:bg-gray-700 border-transparent';
	}

	return (
		<div>
			<div
				onClick={handleClick}
				className={`flex items-center py-0.5 select-none cursor-pointer align-bottom border ${style}`}
				style={{ paddingLeft: `${depth + 2}rem` }}
			>
				{isOpened ? (
					<ChevronDownIcon fill='#9CA3AF' className='-ml-6' />
				) : (
					<ChevronRightIcon fill='#9CA3AF' className='-ml-6' />
				)}
				<FolderIcon
					fill='#9CA3AF'
					className='self-end w-5 mr-1 align-bottom'
				/>
				<p className='text-gray-300 text-sm'>{item.name}</p>
			</div>
			<div className='relative'>
				<div
					className='absolute h-full bg-gray-600'
					style={{ marginLeft: `${depth + 1.25}rem`, width: '1px' }}
				></div>
				{childItems.map((item) => {
					return item.type === 'directory' ? (
						<Directory
							item={item}
							depth={depth + 1}
							currentFile={currentFile}
							setCurrentFile={setCurrentFile}
							selection={selection}
							setSelection={setSelection}
						/>
					) : (
						<Note
							item={item}
							depth={depth + 1}
							currentFile={currentFile}
							setCurrentFile={setCurrentFile}
							selection={selection}
							setSelection={setSelection}
						/>
					);
				})}
			</div>
		</div>
	);
}
