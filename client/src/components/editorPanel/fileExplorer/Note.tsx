import React from 'react';
import { FileSystemItem, FileItem } from '../../../types';
import FileIcon from '../../../assets/icons/file.svg';
import { ipcRenderer } from 'electron';

interface Props {
	item: FileSystemItem;
	depth?: number;
	currentFile?: FileItem;
	setCurrentFile: React.Dispatch<FileItem>;
	selection?: FileSystemItem;
	setSelection: React.Dispatch<FileSystemItem>;
	itemSelectContext?: FileSystemItem;
	setItemSelectContext: React.Dispatch<FileSystemItem>;
	renameItem: boolean;
	setRenameItem: React.Dispatch<boolean>;
}

export function Note({
	item,
	depth = 0,
	setCurrentFile,
	currentFile,
	selection,
	setSelection,
	itemSelectContext,
	setItemSelectContext,
	renameItem,
	setRenameItem
}: Props) {
	const handleClick = () => {
		setSelection(item);

		setCurrentFile({
			name: item.name,
			path: item.path
		});
	};

	const handleContextMenu = () => {
		ipcRenderer.send('openExplorerFileContextMenu');
		setItemSelectContext(item);
	};

	let style = '';

	if (selection?.path === item.path) {
		style =
			'bg-blue-500 border-blue-300 border bg-opacity-30 border-opacity-30';
	} else {
		style = 'hover:bg-opacity-30 hover:bg-gray-700 border-transparent';
	}

	let displayItem = undefined;
	if (renameItem && itemSelectContext?.path === item.path) {
		console.log(setRenameItem);
		displayItem = (
			<input
				type='text'
				// value={renameText}
				value={item.name}
				// onChange={handleRenameOnChange}
				// onKeyDown={handleRenameKeyDown}
				autoFocus
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
			className={`flex select-none cursor-pointer py-0.5 align-bottom border ${style} `}
		>
			<FileIcon fill='#9CA3AF' className='self-end w-5 mr-1' />
			{/* <p
				className={`${
					currentFile?.path === item.path
						? 'text-white'
						: 'text-gray-300'
				} text-sm`}
			>
				{item.name}
			</p> */}
			{displayItem}
		</div>
	);
}
