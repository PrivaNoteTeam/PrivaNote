import React from 'react';
import { useEditorStore, useStore } from '../../../../hooks';
import { ipcRenderer } from 'electron';
import { FileSystemItem } from '../../../../../shared/types';
import { renameExplorerItem } from '../../../../../shared/utils';

interface Args {
	item: FileSystemItem;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function useNote({ item, renameText, setRenameText }: Args) {
	const [{ currentNote }, dispatch] = useStore();
	const [{ secondarySelection, isRenaming }, editorDispatch] =
		useEditorStore();
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

	return {
		handleClick,
		handleContextMenu,
		handleRenameChange,
		handleRenameKeyDown,
		handleRenameBlur,
		handleRenameFocus
	};
}
