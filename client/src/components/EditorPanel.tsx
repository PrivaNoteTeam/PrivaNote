import React, { useEffect, useState } from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';
import { ipcRenderer } from 'electron';
import { createFile } from '../utils/createFile';
import { getFileSystemItems } from '../utils/getFileSystemItems';
import { FileItem, FileSystemItem } from '../types';
import { getParentDirectory } from '../utils/getParentDirectory';

interface Props {
	currentNotebook?: string;
	currentFile: FileItem | undefined;
	setCurrentFile: React.Dispatch<FileItem | undefined>;
}

export function EditorPanel({
	currentNotebook,
	currentFile,
	setCurrentFile
}: Props) {
	const [selection, setSelection] = useState<FileSystemItem | undefined>();
	const [fileExplorerVisible, setFileExplorerVisible] = useState(true);
	const [itemSelectContext, setItemSelectContext] = useState<
		FileSystemItem | undefined
	>();
	const [renameItem, setRenameItem] = useState(false);

	useEffect(() => {
		ipcRenderer.removeAllListeners('createNote');
		ipcRenderer.on('createNote', () => {
			if (!currentNotebook) return;

			const newFilePath = selection
				? getParentDirectory(selection.path, { onlyFiles: true })
				: currentNotebook;
			const newFile = createFile(newFilePath);
			setCurrentFile(newFile);
		});

		ipcRenderer.removeAllListeners('toggleFileExplorer');
		ipcRenderer.on('toggleFileExplorer', () => {
			if (!currentNotebook) return;

			setFileExplorerVisible(!fileExplorerVisible);
		});

		ipcRenderer.removeAllListeners('renameExplorerItem');
		ipcRenderer.on('renameExplorerItem', () => {
			setRenameItem(true);
		});
	}, [currentNotebook, selection, fileExplorerVisible]);

	return currentNotebook ? (
		<>
			{fileExplorerVisible && (
				<FileExplorer
					currentNotebook={currentNotebook}
					currentFile={currentFile}
					setCurrentFile={setCurrentFile}
					selection={selection}
					setSelection={setSelection}
					items={getFileSystemItems(currentNotebook)}
					itemSelectContext={itemSelectContext}
					setItemSelectContext={setItemSelectContext}
					renameItem={renameItem}
					setRenameItem={setRenameItem}
				/>
			)}

			{currentFile ? (
				<Editor
					currentNotebook={currentNotebook}
					currentFile={currentFile}
					setSelection={setSelection}
				/>
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
