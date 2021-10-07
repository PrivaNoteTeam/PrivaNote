import React, { useState } from 'react';
import { FileSystemItem, EditorAction } from '../../../types';
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import FolderIcon from '../../../assets/icons/folder-f.svg';
import { getFileSystemItems } from '../../../utils/getFileSystemItems';
import { Note } from './Note';
import { ipcRenderer } from 'electron';
import { renameExplorerItem } from '../../../utils/renameExplorerItem';
import { useStore } from '../../../useStore';

interface Props {
	item: FileSystemItem;
	depth?: number;
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function Directory({
	item,
	depth = 0,
	primarySelection,
	secondarySelection,
	isRenaming,
	editorDispatch,
	renameText,
	setRenameText
}: Props) {
	const [{ currentNote }, dispatch] = useStore();
	const [isOpened, setIsOpened] = useState(false);

	let childItems: FileSystemItem[] = isOpened
		? getFileSystemItems(item.path)
		: [];

	const handleClick = () => {
		if (secondarySelection?.path === item.path) {
			return;
		} else if (secondarySelection) {
			editorDispatch({
				type: 'secondarySelect',
				secondarySelection: undefined,
				isRenaming
			});
		}

		editorDispatch({
			type: 'primarySelect',
			primarySelection: item,
			isRenaming
		});

		setIsOpened(!isOpened);
	};

	const handleContextMenu = () => {
		ipcRenderer.send('openExplorerFileContextMenu');

		editorDispatch({
			type: 'secondarySelect',
			secondarySelection: item,
			isRenaming
		});

		setRenameText(item.name);
	};

	const handleRenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRenameText(event.target.value);
	};

	const handleRenameKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Enter' || event.code === '13') {
			renameExplorerItem(item.path, renameText)
				.then((renamedItem) => {
					editorDispatch({
						type: 'rename',
						isRenaming: false
					});

					editorDispatch({
						type: 'secondarySelect',
						secondarySelection: undefined,
						isRenaming // might have old value
					});

					if (item.path == currentNote?.path) {
						dispatch({
							type: 'openNote',
							currentNote: renamedItem
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		if (event.key === 'Escape' || event.code === '27') {
			editorDispatch({
				type: 'rename',
				isRenaming: false
			});

			editorDispatch({
				type: 'secondarySelect',
				secondarySelection: undefined,
				isRenaming
			});
		}
	};

	const handleRenameBlur = () => {
		editorDispatch({
			type: 'rename',
			isRenaming: false
		});
	};

	const handleRenameFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
	};

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
