import React, { useState } from 'react';
import { FileSystemItem, FileItem } from '../../../types';
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import FolderIcon from '../../../assets/icons/folder-f.svg';
import { getFileSystemItems } from '../../../utils/getFileSystemItems';
import { Note } from './Note';
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

export function Directory({
	item,
	depth = 0,
	currentFile,
	setCurrentFile,
	selection,
	setSelection,
	itemSelectContext,
	setItemSelectContext,
	renameItem,
	setRenameItem,
	renameText,
	setRenameText
}: Props) {
	const [isOpened, setIsOpened] = useState(false);

	let childItems: FileSystemItem[] = isOpened
		? getFileSystemItems(item.path)
		: [];

	const handleClick = () => {
		setSelection(item);
		setIsOpened(!isOpened);
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
			renameExplorerItem(item.path, renameText)
				.then((renamedItem) => {
					setRenameItem(false);
					setItemSelectContext(undefined!);
					if (item.path == currentFile?.path) {
						setCurrentFile(renamedItem!);
					}
				})
				.catch((error) => {
					console.log(error);
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

	const handleRenameFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
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
				onFocus={handleRenameFocus}
				autoFocus
				className='bg-transparent outline-none text-white text-sm'
			/>
		);
	} else {
		displayItem = <p className='text-gray-300 text-sm'>{item.name}</p>;
	}

	return (
		<div>
			<div
				onClick={handleClick}
				onContextMenu={handleContextMenu}
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
				{displayItem}
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
							itemSelectContext={itemSelectContext}
							setItemSelectContext={setItemSelectContext}
							renameItem={renameItem}
							setRenameItem={setRenameItem}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					) : (
						<Note
							item={item}
							depth={depth + 1}
							currentFile={currentFile}
							setCurrentFile={setCurrentFile}
							selection={selection}
							setSelection={setSelection}
							itemSelectContext={itemSelectContext}
							setItemSelectContext={setItemSelectContext}
							renameItem={renameItem}
							setRenameItem={setRenameItem}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					);
				})}
			</div>
		</div>
	);
}
