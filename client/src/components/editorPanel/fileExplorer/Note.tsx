import React, { useState } from 'react';
import { FileSystemItem } from '../../../types';
import FileIcon from '../../../assets/icons/file.svg';

interface Props {
	item: FileSystemItem;
}

export function Note({ item }: Props) {
	const [isOpened, setIsOpened] = useState(false);

	const handleClick = () => {
		setIsOpened(true);
	};

	return (
		<div
			onClick={handleClick}
			className={`flex select-none cursor-pointer py-0.5 pl-8 hover:bg-gray-700 ${
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
