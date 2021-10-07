import React from 'react';
import { useStore } from '../../useStore';
import { FileSystemItem, EditorAction } from '../../types';
import { getFileSystemItems } from '../../utils/getFileSystemItems';
import { FileExplorer } from './FileExplorer';
import { Editor } from './Editor';
import { Placeholder } from './Placeholder';

interface Props {
	fileExplorerVisible: boolean;
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
}

export function UIEditorPanel({
	fileExplorerVisible,
	primarySelection,
	secondarySelection,
	isRenaming,
	editorDispatch
}: Props) {
	const [{ notebook, currentNote }] = useStore();

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
