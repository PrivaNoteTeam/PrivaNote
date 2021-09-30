import React, { useEffect, useState } from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';
import fs from 'fs';
import { ipcRenderer } from 'electron';
import { useRelativePath } from '../utils/useRelativePath';
import { createFile } from '../utils/createFile';

interface Props {
	currentNotebook?: string;
}

export function EditorPanel({ currentNotebook }: Props) {
	const [currentFile, setCurrentFile] = useState<string | undefined>();

	// Remove default file code when file hierarchy is done.
	let fileStructure: string[] = [];

	if (currentNotebook) {
		fileStructure = fs.readdirSync(currentNotebook);
		if (!currentFile) {
			const defaultFile = fileStructure.find((n) => n.endsWith('.md'));

			defaultFile &&
				setCurrentFile(
					useRelativePath(
						currentNotebook,
						`${currentNotebook}/${defaultFile}`
					)
				);
		}
	}

	useEffect(() => {
		ipcRenderer.on('createNote', () => {
			if (!currentNotebook) return;

			console.log('b');

			const newFilePath = createFile(`${currentNotebook}`);

			console.log('a');

			setCurrentFile(useRelativePath(currentNotebook, newFilePath));
		});
	}, [currentNotebook]);

	return currentNotebook ? (
		<>
			<FileExplorer />
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
