import React from 'react';
import { FileSystemItem, FileItem } from '../../../types';
import FileIcon from '../../../assets/icons/file.svg';
import { ipcRenderer } from 'electron';
import { renameExplorerItem } from '../../../utils/renameExplorerItem';

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
	renameText: string;
	setRenameText: React.Dispatch<string>;
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
	setRenameItem,
	renameText,
	setRenameText
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
		setRenameText(item.name);
	};

	const handleRenameOnChange = (event: any) => {
		setRenameText(event.target.value);
	};

	const handleRenameKeyDown = (event: any) => {
		if (event.key === 'Enter' || event.KeyCode === 13) {
			renameExplorerItem(item.path, renameText).then((renamedItem) => {
				setRenameItem(false);
				setItemSelectContext(undefined!);
				if (item.path == currentFile?.path) {
					setCurrentFile(renamedItem!);
				}
			});
		}
		if (event.key === 'Escape' || event.KeyCode === 27) {
			setRenameItem(false);
			setItemSelectContext(undefined!);
		}
	};

	const handleRenameOnBlur = () => {
		setRenameItem(false);
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
		displayItem = (
			<input
				type='text'
				value={renameText}
				onChange={handleRenameOnChange}
				onKeyDown={handleRenameKeyDown}
				onBlur={handleRenameOnBlur}
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
			{displayItem}
		</div>
	);
}
