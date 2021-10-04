import React, { useEffect, useState } from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';
import { ipcRenderer } from 'electron';
import { createFile } from '../utils/createFile';
import { getFileSystemItems } from '../utils/getFileSystemItems';
import { FileItem } from '../types';

interface Props {
	currentNotebook?: string;
}

export function EditorPanel({ currentNotebook }: Props) {
	const [currentFile, setCurrentFile] = useState<FileItem | undefined>();
	const [fileExplorerVisible , setFileExplorerVisible] = React.useState(true);
	
	useEffect(() => {
		ipcRenderer.on('createNote', () => {
			if (!currentNotebook) return;

			const file = createFile(`${currentNotebook}`);

			setCurrentFile(file);
		});
		

	
	
	}, [currentNotebook]);

	useEffect(() => {
		ipcRenderer.on('toggleFileExplorer', () => {
			// set state to opposite of what it is currently
			setFileExplorerVisible(!fileExplorerVisible)
		})
	}, [fileExplorerVisible]);

	

	return currentNotebook ? (
		<>
			{ fileExplorerVisible && 
				<FileExplorer
					currentNotebook={currentNotebook}
					currentFile={currentFile}
					setCurrentFile={setCurrentFile}
					items={getFileSystemItems(currentNotebook)}
				/>
			}
			{currentFile ? (
				<Editor
					currentNotebook={currentNotebook}
					currentFile={currentFile}
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
