import React from 'react';
import { FileSystemItem, EditorAction } from '../../../types';
import { UIDirectory } from './directory/UIDirectory';
import { useDirectory } from './directory/useDirectory';

interface Props {
	item: FileSystemItem;
	depth?: number;
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function Directory({
	item,
	depth = 0,
	primarySelection,
	secondarySelection,
	isRenaming,
	editorDispatch,
	renameText,
	setRenameText
}: Props) {
	const {
		isOpened,
		childItems,
		handleClick,
		handleContextMenu,
		handleRenameKeyDown,
		handleRenameFocus,
		handleRenameChange,
		handleRenameBlur
	} = useDirectory({
		item,
		secondarySelection,
		isRenaming,
		renameText,
		setRenameText,
		editorDispatch
	});

	return (
		<UIDirectory
			item={item}
			depth={depth}
			isOpened={isOpened}
			primarySelection={primarySelection}
			secondarySelection={secondarySelection}
			isRenaming={isRenaming}
			editorDispatch={editorDispatch}
			renameText={renameText}
			childItems={childItems}
			setRenameText={setRenameText}
			handleClick={handleClick}
			handleContextMenu={handleContextMenu}
			handleRenameBlur={handleRenameBlur}
			handleRenameChange={handleRenameChange}
			handleRenameFocus={handleRenameFocus}
			handleRenameKeyDown={handleRenameKeyDown}
		/>
	);
}
