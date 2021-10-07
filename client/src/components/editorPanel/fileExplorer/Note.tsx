import React from 'react';
import { FileSystemItem, EditorAction } from '../../../types';
import { useNote } from './note/useNote';
import { UINote } from './note/UINote';

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

export function Note({
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
		handleRenameKeyDown,
		handleRenameBlur,
		handleClick,
		handleContextMenu,
		handleRenameChange,
		handleRenameFocus
	} = useNote({
		item,
		renameText,
		setRenameText,
		isRenaming,
		secondarySelection,
		editorDispatch
	});

	return (
		<UINote
			item={item}
			depth={depth}
			primarySelection={primarySelection}
			secondarySelection={secondarySelection}
			isRenaming={isRenaming}
			editorDispatch={editorDispatch}
			renameText={renameText}
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
