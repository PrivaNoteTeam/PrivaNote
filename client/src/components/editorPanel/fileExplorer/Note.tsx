import React from 'react';
import { FileSystemItem } from '../../../types';
import FileIcon from '../../../assets/icons/file.svg';
import { ipcRenderer } from 'electron';
import { renameExplorerItem } from '../../../utils/renameExplorerItem';
import { useStore } from '../../../useStore';

interface Props {
	item: FileSystemItem;
	depth?: number;
	selection?: FileSystemItem;
	setSelection: React.Dispatch<FileSystemItem>;
	itemSelectContext?: FileSystemItem;
	setItemSelectContext: React.Dispatch<FileSystemItem | undefined>;
	renameItem: boolean;
	setRenameItem: React.Dispatch<boolean>;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function Note({
	item,
	depth = 0,
	selection,
	setSelection,
	itemSelectContext,
	setItemSelectContext,
	renameItem,
	setRenameItem,
	renameText,
	setRenameText
}: Props) {
	const [{ currentNote }, dispatch] = useStore();
	const handleClick = () => {
		if (itemSelectContext?.path === item.path) {
			return;
		} else if (itemSelectContext) {
			// clicking another note should remove current context selection
			setItemSelectContext(undefined);
		}

		setSelection(item);

		dispatch({
			type: 'openNote',
			currentNote: {
				name: item.name,
				path: item.path
			}
		});
	};

	const handleContextMenu = () => {
		ipcRenderer.send('openExplorerFileContextMenu');
		setItemSelectContext(item);
		setRenameText(item.name);
	};

	const handleRenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRenameText(event.target.value);
	};

	const handleRenameKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Enter' || event.code === '13') {
			renameExplorerItem(item.path, renameText).then((renamedItem) => {
				setRenameItem(false);
				setItemSelectContext(undefined!);
				if (item.path == currentNote?.path) {
					dispatch({
						type: 'openNote',
						currentNote: renamedItem
					});
				}
			});
		}
		if (event.key === 'Escape' || event.code === '27') {
			setRenameItem(false);
			setItemSelectContext(undefined!);
		}
	};

	const handleRenameBlur = () => {
		setRenameItem(false);
	};

	const handleRenameFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
	};

	let style = '';

	if (itemSelectContext?.path === item.path) {
		style = 'border-blue-500 border-opacity-70 border-2';
	} else if (selection?.path === item.path) {
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
					currentNote?.path === item.path
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
