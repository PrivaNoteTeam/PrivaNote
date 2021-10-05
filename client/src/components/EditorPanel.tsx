import React, { useEffect, useState } from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';
import { ipcRenderer } from 'electron';
import { createFile } from '../utils/createFile';
import { getFileSystemItems } from '../utils/getFileSystemItems';
import { FileItem, FileSystemItem } from '../types';

interface Props {
	currentNotebook?: string;
}

export function EditorPanel({ currentNotebook }: Props) {
	const [currentFile, setCurrentFile] = useState<FileItem | undefined>();
	const [selection, setSelection] = useState<FileSystemItem | undefined>();
	const [fileExplorerVisible, setFileExplorerVisible] = useState(true);

	useEffect(() => {
		ipcRenderer.removeAllListeners('createNote');
		ipcRenderer.on('createNote', () => {
			if (!currentNotebook) return;

			const file = createFile(`${currentNotebook}`);

			setCurrentFile(file);
		});

		ipcRenderer.removeAllListeners('toggleFileExplorer');
		ipcRenderer.on('toggleFileExplorer', () => {
			if (!currentNotebook) return;

			setFileExplorerVisible(!fileExplorerVisible);
		});
	}, [currentNotebook, fileExplorerVisible]);

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
