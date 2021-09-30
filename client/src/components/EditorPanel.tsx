import React, { useEffect, useState } from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';
import fs from 'fs';
import { ipcRenderer } from 'electron';

interface Props {
	currentNotebook?: string;
}

export function EditorPanel({ currentNotebook }: Props) {
	const [currentFile, setCurrentFile] = useState<string | undefined>();

	let fileStructure: string[] = [];

	if (currentNotebook) {
		fileStructure = fs.readdirSync(currentNotebook);
		if (!currentFile && fileStructure.length != 0)
			setCurrentFile(fileStructure[0]);
	}

	useEffect(() => {
		ipcRenderer.on('createNote', () => {
			console.log(currentNotebook + 'index.md');
			if (!currentNotebook) return; // temporary solution. Try to disable menu item until currentNotebook

			let count = 0;
			let filename = 'Untitled.md';

			while (fs.existsSync(`${currentNotebook}/${filename}`)) {
				filename = `Untitled (${++count}).md`;
			}

			fs.writeFileSync(`${currentNotebook}/${filename}`, '');

			setCurrentFile(`${currentNotebook}/${filename}`);
		});
	}, [currentNotebook]);

	return currentNotebook ? (
		<>
			<FileExplorer />
			{currentFile ? (
				<Editor currentFile={currentFile} />
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
