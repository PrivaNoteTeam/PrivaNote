import React from 'react';
import { FileExplorer } from './editorPanel/FileExplorer';
import { Editor } from './editorPanel/Editor';
import { Placeholder } from './editorPanel/Placeholder';

interface Props {
	currentNotebook?: string;
}

export function EditorPanel({ currentNotebook }: Props) {
	return currentNotebook ? (
		<>
			<FileExplorer />
			<Editor currentFile={currentNotebook + '/index.md'} />
		</>
	) : (
		<>
			<Placeholder />
		</>
	);
}
