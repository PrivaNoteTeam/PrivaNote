import { useState } from 'react';
import { useEditorStore, useStore } from '@hooks';
import { getFileSystemItems } from '@utils';
import { FileSystemItem } from '@types';
import { ipcRenderer } from 'electron';

interface Args {
	item: FileSystemItem;
}

export function useNode({ item }: Args) {
	const [opened, setOpened] = useState(false);
	const [renaming, setRenaming] = useState(false);
	const [{}, dispatch] = useStore();
	const [{ primarySelection, secondarySelection }, editorDispatch] =
		useEditorStore();

	const foldable = item.type === 'directory';

	let children: FileSystemItem[] =
		foldable && opened ? getFileSystemItems(item.path) : [];

	const primarySelected = primarySelection?.path === item.path;
	const secondarySelected = secondarySelection?.path === item.path;

	const handleClick = () => {
		if (secondarySelected) return;

		if (secondarySelection) {
			editorDispatch({
				type: 'secondarySelect',
				secondarySelection: undefined
			});
		}

		editorDispatch({
			type: 'primarySelect',
			primarySelection: item
		});

		if (item.type === 'note') {
			dispatch({
				type: 'openNote',
				currentFile: {
					name: item.name,
					path: item.path
				}
			});
		}

		if (foldable) setOpened(!opened);
	};

	const handleContextMenu = () => {
		ipcRenderer.send('openExplorerFileContextMenu');

		editorDispatch({
			type: 'secondarySelect',
			secondarySelection: item
		});

		console.log('context menu');

		ipcRenderer.removeAllListeners('renameExplorerItem');
		ipcRenderer.on('renameExplorerItem', () => {
			console.log('renaming');
			setRenaming(true);
		});
	};

	return {
		children,
		opened,
		foldable,
		primarySelected,
		secondarySelected,
		handleClick,
		handleContextMenu,
		renaming,
		setRenaming
	};
}
