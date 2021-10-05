import React from 'react';
import { FileSystemItem, FileItem } from '../../../types';
import FileIcon from '../../../assets/icons/file.svg';

interface Props {
	item: FileSystemItem;
	depth?: number;
	currentFile?: FileItem;
	setCurrentFile: React.Dispatch<FileItem>;
	selection?: FileSystemItem;
	setSelection: React.Dispatch<FileSystemItem>;
}

export function Note({
	item,
	depth = 0,
	setCurrentFile,
	currentFile,
	selection,
	setSelection
}: Props) {
	const handleClick = () => {
		setSelection(item);

		setCurrentFile({
			name: item.name,
			path: item.path
		});
	};

	let style = '';

	if (selection?.path === item.path) {
		style =
			'bg-blue-500 border-blue-300 border bg-opacity-30 border-opacity-30';
	} else if (currentFile?.path === item.path) {
		style = 'bg-gray-700';
	} else {
		style = 'hover:bg-gray-700';
	}

	return (
		<div
			onClick={handleClick}
			style={{ paddingLeft: `${depth + 2}rem` }}
			className={`flex select-none cursor-pointer py-0.5 ${style} `}
		>
			<FileIcon fill='#9CA3AF' className='self-end w-5 mr-1' />
			<p
				className={`${
					currentFile?.path === item.path
						? 'text-white'
						: 'text-gray-300'
				} text-sm`}
			>
				{item.name}
			</p>
		</div>
	);
}
