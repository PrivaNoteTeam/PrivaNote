import React from 'react';
import { useStore } from '@hooks';
import { getFileSystemItems } from '@utils';
import { FileExplorer } from './FileExplorer';
import { Editor } from './Editor';
import { Placeholder } from './Placeholder';

interface Props {
	fileExplorerVisible: boolean;
}

export function UIEditorPanel({ fileExplorerVisible }: Props) {
	const [{ notebook, currentNote }] = useStore();

	return notebook ? (
		<>
			{fileExplorerVisible && (
				<FileExplorer items={getFileSystemItems(notebook)} />
			)}

			{currentNote ? (
				<Editor />
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
