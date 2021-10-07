import React from 'react';
import { FileSystemItem, EditorAction } from '../../types';
import { UIFileExplorer } from './fileExplorer/UIFileExplorer';

import { useFileExplorer } from './fileExplorer/useFileExplorer';

interface Props {
	items: FileSystemItem[];
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
}

export function FileExplorer({
	items,
	primarySelection,
	secondarySelection,
	isRenaming,
	editorDispatch
}: Props) {
	const {
		handleAddDirectoryClick,
		handleAddFileClick,
		handleOuterClick,
		renameText,
		setRenameText
	} = useFileExplorer({
		primarySelection,
		secondarySelection,
		isRenaming,
		editorDispatch
	});

	return (
		<UIFileExplorer
			items={items}
			handleAddDirectoryClick={handleAddDirectoryClick}
			handleAddFileClick={handleAddFileClick}
			handleOuterClick={handleOuterClick}
			renameText={renameText}
			setRenameText={setRenameText}
			editorDispatch={editorDispatch}
			isRenaming={isRenaming}
			primarySelection={primarySelection}
			secondarySelection={secondarySelection}
		/>
	);
}
