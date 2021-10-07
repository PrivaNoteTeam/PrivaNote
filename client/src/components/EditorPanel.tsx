import React, { useEffect, useState, useReducer } from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';
import { ipcRenderer } from 'electron';
import { createFile } from '../utils/createFile';
import { getFileSystemItems } from '../utils/getFileSystemItems';
import { getParentDirectory } from '../utils/getParentDirectory';
import { deleteExplorerItem } from '../utils/deleteExplorerItem';
import { fileExist } from '../utils/fileExists';
import { useStore } from '../useStore';
import { EditorState, EditorAction } from '../types';

const reducer = (state: EditorState, action: EditorAction) => {
	switch (action.type) {
		case 'primarySelect':
			return { ...state, primarySelection: action.primarySelection };
		case 'secondarySelect':
			return { ...state, secondarySelection: action.secondarySelection };
		case 'rename':
			return { ...state, isRenaming: action.isRenaming };
	}
};

export function EditorPanel() {
	const [{ notebook, currentNote }, dispatch] = useStore();
	const [
		{ primarySelection, secondarySelection, isRenaming },
		editorDispatch
	] = useReducer(reducer, { isRenaming: false });
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

	return notebook ? (
		<>
			{fileExplorerVisible && (
				<FileExplorer
					items={getFileSystemItems(notebook)}
					primarySelection={primarySelection}
					secondarySelection={secondarySelection}
					isRenaming={isRenaming}
					editorDispatch={editorDispatch}
				/>
			)}

			{currentNote ? (
				<Editor editorDispatch={editorDispatch} />
			) : (
				<Placeholder text='Create or open a note to continue' />
			)}
		</>
	) : (
		<>
			<Placeholder text='Open a notebook to continue' />
		</>
	);
}
