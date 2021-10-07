import React, { useEffect, useState } from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';
import { ipcRenderer } from 'electron';
import { createFile } from '../utils/createFile';
import { getFileSystemItems } from '../utils/getFileSystemItems';
import { FileItem, FileSystemItem } from '../types';
import { getParentDirectory } from '../utils/getParentDirectory';
import { deleteExplorerItem } from '../utils/deleteExplorerItem';
import { fileExist } from '../utils/fileExists';
import { useStore } from '../useStore';

interface Props {
	currentFile: FileItem | undefined;
	setCurrentFile: React.Dispatch<FileItem | undefined>;
}

export function EditorPanel({ currentFile, setCurrentFile }: Props) {
	const [{ notebook }] = useStore();
	const [selection, setSelection] = useState<FileSystemItem | undefined>();
	const [fileExplorerVisible, setFileExplorerVisible] = useState(true);
	const [itemSelectContext, setItemSelectContext] = useState<
		FileSystemItem | undefined
	>();
	const [renameItem, setRenameItem] = useState(false);

	useEffect(() => {
		ipcRenderer.removeAllListeners('createNote');
		ipcRenderer.on('createNote', () => {
			if (!notebook) return;

			const newFilePath = selection
				? getParentDirectory(selection.path, { onlyFiles: true })
				: notebook;
			const newFile = createFile(newFilePath);
			setCurrentFile(newFile);
		});

		ipcRenderer.removeAllListeners('toggleFileExplorer');
		ipcRenderer.on('toggleFileExplorer', () => {
			if (!notebook) return;

			setFileExplorerVisible(!fileExplorerVisible);
		});

		ipcRenderer.removeAllListeners('renameExplorerItem');
		ipcRenderer.on('renameExplorerItem', () => {
			setRenameItem(true);
		});

		ipcRenderer.removeAllListeners('deleteExplorerItem');
		ipcRenderer.on('deleteExplorerItem', () => {
			deleteExplorerItem(itemSelectContext?.path).then(() => {
				if (
					currentFile?.path === itemSelectContext?.path ||
					!fileExist(currentFile?.path)
				) {
					setCurrentFile(undefined);
				}
				setItemSelectContext(undefined);
			});
		});
	}, [notebook, selection, fileExplorerVisible, itemSelectContext]);

	return notebook ? (
		<>
			{fileExplorerVisible && (
				<FileExplorer
					currentFile={currentFile}
					setCurrentFile={setCurrentFile}
					selection={selection}
					setSelection={setSelection}
					items={getFileSystemItems(notebook)}
					itemSelectContext={itemSelectContext}
					setItemSelectContext={setItemSelectContext}
					renameItem={renameItem}
					setRenameItem={setRenameItem}
				/>
			)}

			{currentFile ? (
				<Editor currentFile={currentFile} setSelection={setSelection} />
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
