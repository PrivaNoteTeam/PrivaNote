import { useEffect, useState } from 'react';
import { useStore } from '@hooks';
import { ipcRenderer } from 'electron';
import {
	getParentDirectory,
	deleteExplorerItem,
	fileExist,
	createFile
} from '@utils';
import { useEditorStore } from '@hooks';

export function useEditorPanel() {
	const [livePreviewVisiable, setLivePreviewVisiable] = useState(true);
	const [{ notebook, currentFile }, dispatch] = useStore();
	const [{ primarySelection, secondarySelection }, editorDispatch] =
		useEditorStore();
	const [text, setText] = useState('');

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
				currentFile: newFile
			});
		});

		ipcRenderer.removeAllListeners('toggleLivePreviewVisabilty');
		ipcRenderer.on('toggleLivePreviewVisabilty', () => {
			if (!notebook) {
				return;
			}
			setLivePreviewVisiable(!livePreviewVisiable);
		});

		//ipcRenderer.removeAllListeners('toggleFileExplorer');
		//ipcRenderer.on('toggleFileExplorer', () => {
		//if (!notebook) return;

		//setFileExplorerVisible(!fileExplorerVisible);
		//});
		/*
		ipcRenderer.removeAllListeners('renameExplorerItem');
		ipcRenderer.on('renameExplorerItem', () => {
			editorDispatch({
				type: 'rename',
				isRenaming: true
			});
		});*/

		ipcRenderer.removeAllListeners('deleteExplorerItem');
		ipcRenderer.on('deleteExplorerItem', () => {
			deleteExplorerItem(secondarySelection?.path).then(() => {
				if (
					currentFile?.path === secondarySelection?.path ||
					!fileExist(currentFile?.path)
				) {
					dispatch({
						type: 'openNote',
						currentFile: undefined
					});
				}

				editorDispatch({
					type: 'secondarySelect',
					secondarySelection: undefined
				});
			});
		});
	}, [notebook, primarySelection, secondarySelection, livePreviewVisiable]);

	const handlePreviewClose = () => {
		setLivePreviewVisiable(false);
	};

	return {
		primarySelection,
		secondarySelection,
		editorDispatch,
		text,
		setText,
		livePreviewVisiable,
		handlePreviewClose
	};
}
