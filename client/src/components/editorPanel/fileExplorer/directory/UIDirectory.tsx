import React from 'react';
import { EditorAction, FileSystemItem } from '../../../../types';
import { Note } from '../Note';
import { Directory } from '../Directory';
import ChevronRightIcon from '../../../../assets/icons/chevron-right.svg';
import ChevronDownIcon from '../../../../assets/icons/chevron-down.svg';
import FolderIcon from '../../../../assets/icons/folder-f.svg';

interface Props {
	item: FileSystemItem;
	childItems: FileSystemItem[];
	depth: number;
	isOpened: boolean;
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
	renameText: string;
	setRenameText: React.Dispatch<string>;
	editorDispatch: React.Dispatch<EditorAction>;
	handleClick: () => void;
	handleRenameBlur: () => void;
	handleRenameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRenameFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
	handleRenameKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	handleContextMenu: () => void;
}

export function UIDirectory({
	item,
	childItems,
	depth,
	isOpened,
	primarySelection,
	secondarySelection,
	isRenaming,
	renameText,
	setRenameText,
	handleClick,
	handleRenameBlur,
	handleRenameChange,
	handleRenameFocus,
	handleRenameKeyDown,
	handleContextMenu,
	editorDispatch
}: Props) {
	let style = '';

	if (secondarySelection?.path === item.path) {
		style = 'border-blue-500 border-opacity-70 border-2';
	} else if (primarySelection?.path === item.path) {
		style =
			'bg-blue-500 border-blue-300 border bg-opacity-30 border-opacity-30';
	} else {
		style =
			'hover:bg-opacity-30 hover:bg-gray-700 border border-transparent';
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
		displayItem = <p className='text-gray-300 text-sm'>{item.name}</p>;
	}

	return (
		<div>
			<div
				onClick={handleClick}
				onContextMenu={handleContextMenu}
				className={`flex items-center py-0.5 select-none cursor-pointer align-bottom ${style}`}
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
							primarySelection={primarySelection}
							secondarySelection={secondarySelection}
							isRenaming={isRenaming}
							editorDispatch={editorDispatch}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					) : (
						<Note
							item={item}
							depth={depth + 1}
							primarySelection={primarySelection}
							secondarySelection={secondarySelection}
							isRenaming={isRenaming}
							editorDispatch={editorDispatch}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					);
				})}
			</div>
		</div>
	);
}
