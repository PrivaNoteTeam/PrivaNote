import React, { useState } from 'react';
import { useStore } from '../../../../useStore';
import { ipcRenderer } from 'electron';
import { FileSystemItem, EditorAction } from '../../../../types';
import { renameExplorerItem, getFileSystemItems } from '../../../../utils';

interface Args {
	item: FileSystemItem;
	editorDispatch: React.Dispatch<EditorAction>;
	renameText: string;
	isRenaming: boolean;
	secondarySelection?: FileSystemItem;
	setRenameText: React.Dispatch<string>;
}

export function useDirectory({
	item,
	secondarySelection,
	isRenaming,
	renameText,
	setRenameText,
	editorDispatch
}: Args) {
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
						isRenaming
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

	return {
		childItems,
		isOpened,
		handleClick,
		handleRenameBlur,
		handleRenameChange,
		handleRenameFocus,
		handleRenameKeyDown,
		handleContextMenu
	};
}
