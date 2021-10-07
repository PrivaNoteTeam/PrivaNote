import React, { useState } from 'react';
import { useStore } from '../../../useStore';
import { FileSystemItem, EditorAction } from '../../../types';
import {
	createFile,
	getParentDirectory,
	createDirectory,
	renameExplorerItem
} from '../../../utils/';

interface Args {
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	editorDispatch: React.Dispatch<EditorAction>;
	isRenaming: boolean;
}

export function useFileExplorer({
	primarySelection,
	secondarySelection,
	editorDispatch,
	isRenaming
}: Args) {
	const [{ notebook, currentNote }, dispatch] = useStore();
	const [renameText, setRenameText] = useState('');

	const handleAddFileClick = () => {
		const newFilePath = primarySelection
			? getParentDirectory(primarySelection.path, { onlyFiles: true })
			: notebook;
		const newFile = createFile(newFilePath as string);

		dispatch({
			type: 'openNote',
			currentNote: newFile
		});
	};

	const handleAddDirectoryClick = () => {
		const newDirectoryPath = primarySelection
			? getParentDirectory(primarySelection.path, { onlyFiles: true })
			: notebook;
		const newDirectory = createDirectory(newDirectoryPath as string);

		editorDispatch({
			type: 'primarySelect',
			primarySelection: newDirectory,
			isRenaming
		});
	};

	const handleOuterClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) return;

		editorDispatch({
			type: 'primarySelect',
			primarySelection: undefined,
			isRenaming
		});

		editorDispatch({
			type: 'secondarySelect',
			secondarySelection: undefined,
			isRenaming
		});

		if (isRenaming) {
			renameExplorerItem(secondarySelection?.path!, renameText)
				.then((renamedItem) => {
					editorDispatch({
						type: 'rename',
						isRenaming: false
					});

					editorDispatch({
						type: 'secondarySelect',
						secondarySelection: undefined,
						isRenaming
					});

					if (secondarySelection?.path == currentNote?.path) {
						dispatch({
							type: 'openNote',
							currentNote: renamedItem
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return {
		handleAddFileClick,
		handleAddDirectoryClick,
		handleOuterClick,
		renameText,
		setRenameText
	};
}
