import { useEffect, useState } from 'react';
import { useStore } from '../../hooks';
import { ipcRenderer } from 'electron';
import {
	getParentDirectory,
	deleteExplorerItem,
	fileExist,
	createFile
} from '../../utils';
import { useEditorStore } from '../../hooks/contexts/useEditorStore';

export function useEditorPanel() {
	const [{ notebook, currentNote }, dispatch] = useStore();
	const [
		{ primarySelection, secondarySelection, isRenaming },
		editorDispatch
	] = useEditorStore();
	const [fileExplorerVisible, setFileExplorerVisible] = useState(true);

	useEffect(() => {
		ipcRenderer.removeAllListeners('createNote');
		ipcRenderer.on('createNote', () => {
			if (!notebook) return;

			const newFilePath = primarySelection
				? getParentDirectory(primarySelection.path, { onlyFiles: true })
				: notebook;
			const newFile = createFile(newFilePath);

			dispatch({
				type: 'openNote',
				currentNote: newFile
			});
		});

		ipcRenderer.removeAllListeners('toggleFileExplorer');
		ipcRenderer.on('toggleFileExplorer', () => {
			if (!notebook) return;

			setFileExplorerVisible(!fileExplorerVisible);
		});

		ipcRenderer.removeAllListeners('renameExplorerItem');
		ipcRenderer.on('renameExplorerItem', () => {
			editorDispatch({
				type: 'rename',
				isRenaming: true
			});
		});

		ipcRenderer.removeAllListeners('deleteExplorerItem');
		ipcRenderer.on('deleteExplorerItem', () => {
			deleteExplorerItem(secondarySelection?.path).then(() => {
				if (
					currentNote?.path === secondarySelection?.path ||
					!fileExist(currentNote?.path)
				) {
					dispatch({
						type: 'openNote',
						currentNote: undefined
					});
				}

				editorDispatch({
					type: 'secondarySelect',
					secondarySelection: undefined,
					isRenaming // find a way to not need this
				});
			});
		});
	}, [notebook, primarySelection, secondarySelection, fileExplorerVisible]);

	return {
		primarySelection,
		secondarySelection,
		isRenaming,
		fileExplorerVisible,
		editorDispatch
	};
}
