import React, { useEffect } from 'react';
import { useEditorStore, useStore, useForceUpdate } from '@hooks';
import {
	createFile,
	getParentDirectory,
	createDirectory,
	getFileSystemItems,
	watchDirectory
} from '@utils';

export function useFileExplorer() {
	const [{ notebook }, dispatch] = useStore();
	const [{ primarySelection }, editorDispatch] = useEditorStore();
	const forceUpdate = useForceUpdate();

	const items = notebook ? getFileSystemItems(notebook) : [];

	useEffect(() => {
		if (!notebook) return;

		watchDirectory(notebook, () => forceUpdate());
	}, [notebook]);

	const handleAddFileClick = () => {
		const newFilePath = primarySelection
			? getParentDirectory(primarySelection.path, { onlyFiles: true })
			: notebook;
		const newFile = createFile(newFilePath as string);

		dispatch({
			type: 'openNote',
			currentFile: newFile
		});
	};

	const handleAddDirectoryClick = () => {
		const newDirectoryPath = primarySelection
			? getParentDirectory(primarySelection.path, { onlyFiles: true })
			: notebook;
		const newDirectory = createDirectory(newDirectoryPath as string);

		editorDispatch({
			type: 'primarySelect',
			primarySelection: newDirectory
		});
	};

	const handleOuterClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) return;

		editorDispatch({
			type: 'primarySelect',
			primarySelection: undefined
		});

		editorDispatch({
			type: 'secondarySelect',
			secondarySelection: undefined
		});
	};

	return {
		items,
		handleAddFileClick,
		handleAddDirectoryClick,
		handleOuterClick
	};
}
