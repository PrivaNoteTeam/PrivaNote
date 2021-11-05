import React, { useState } from 'react';
import { useEditorStore, useStore } from '@hooks';
import {
	createFile,
	getParentDirectory,
	createDirectory,
	renameExplorerItem
} from '@utils';

export function useFileExplorer() {
	const [{ notebook, currentNote }, dispatch] = useStore();
	const [
		{ primarySelection, secondarySelection, isRenaming },
		editorDispatch
	] = useEditorStore();
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
		const newDirectory = createDirectory(
			newDirectoryPath as string,
			notebook as string
		);
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
