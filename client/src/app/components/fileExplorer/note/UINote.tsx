import React from 'react';
import { useEditorStore, useStore } from '@hooks';
import { FileSystemItem } from '@types';
import FileIcon from '@assets/icons/file.svg';

interface Props {
	item: FileSystemItem;
	depth: number;
	renameText: string;
	setRenameText: React.Dispatch<string>;
	handleRenameKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	handleRenameBlur: () => void;
	handleClick: () => void;
	handleContextMenu: () => void;
	handleRenameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRenameFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function UINote({
	item,
	renameText,
	depth = 0,
	handleRenameBlur,
	handleClick,
	handleContextMenu,
	handleRenameChange,
	handleRenameFocus,
	handleRenameKeyDown
}: Props) {
	const [{ currentFile }] = useStore();
	const [{ primarySelection, secondarySelection, isRenaming }] =
		useEditorStore();

	let style = '';

	if (secondarySelection?.path === item.path) {
		style = 'border-blue-500 border-opacity-70 border-2';
	} else if (primarySelection?.path === item.path) {
		style =
			'bg-blue-500 border-blue-300 border bg-opacity-30 border-opacity-30';
	} else {
		style = 'hover:bg-opacity-30 hover:bg-gray-700 border-transparent';
	}

	let displayItem = undefined;
	if (isRenaming && secondarySelection?.path === item.path) {
		displayItem = (
			<input
				type='text'
				value={renameText}
				onChange={handleRenameChange}
				onKeyDown={handleRenameKeyDown}
				onBlur={handleRenameBlur}
				onFocus={handleRenameFocus}
				autoFocus
				className='bg-transparent outline-none text-white text-sm'
			/>
		);
	} else {
		displayItem = (
			<p
				className={`${
					currentFile?.path === item.path
						? 'text-white'
						: 'text-gray-300'
				} text-sm`}
			>
				{item.name}
			</p>
		);
	}

	return (
		<div
			onClick={handleClick}
			onContextMenu={handleContextMenu}
			style={{ paddingLeft: `${depth + 2}rem` }}
			className={`flex select-none cursor-pointer py-0.5 align-bottom ${style} `}
		>
			<FileIcon fill='#9CA3AF' className='self-end w-5 mr-1' />
			{displayItem}
		</div>
	);
}
