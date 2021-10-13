import React from 'react';
import { FileSystemItem } from '@types';
import { useNote } from './note/useNote';
import { UINote } from './note/UINote';

interface Props {
	item: FileSystemItem;
	depth?: number;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function Note({ item, depth = 0, renameText, setRenameText }: Props) {
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
		setRenameText
	});

	return (
		<UINote
			item={item}
			depth={depth}
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
