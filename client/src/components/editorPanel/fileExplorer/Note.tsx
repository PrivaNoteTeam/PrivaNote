import React, { useState } from 'react';
import { FileSystemItem, FileItem } from '../../../types';
import FileIcon from '../../../assets/icons/file.svg';

interface Props {
	item: FileSystemItem;
	depth?: number;
	setCurrentFile: React.Dispatch<FileItem>;
}

export function Note({ item, depth = 0, setCurrentFile }: Props) {
	const [isOpened, setIsOpened] = useState(false);

	const handleClick = () => {
		setIsOpened(true);
		setCurrentFile({
			name: item.name,
			path: item.path
		});
	};

	return (
		<div
			onClick={handleClick}
			style={{ paddingLeft: `${depth + 2}rem` }}
			className={`flex select-none cursor-pointer py-0.5 hover:bg-gray-700 ${
				isOpened && 'bg-gray-700'
			}`}
		>
			<FileIcon fill='#9CA3AF' className='self-end w-5 mr-1' />
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
