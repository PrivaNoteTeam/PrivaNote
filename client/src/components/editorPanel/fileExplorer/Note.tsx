import React from 'react';
import { FileSystemItem, EditorAction } from '../../../types';
import FileIcon from '../../../assets/icons/file.svg';
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

export function Note({
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
			renameExplorerItem(item.path, renameText).then((renamedItem) => {
				editorDispatch({
					type: 'rename',
					isRenaming: false
				});

				editorDispatch({
					type: 'secondarySelect',
					secondarySelection: undefined,
					isRenaming
				});

				if (item.path == currentNote?.path) {
					dispatch({
						type: 'openNote',
						currentNote: renamedItem
					});
				}
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
