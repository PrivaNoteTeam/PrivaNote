import React from 'react';
import { FileSystemItem } from '@types';
import { UIDirectory } from './directory/UIDirectory';
import { useDirectory } from './directory/useDirectory';

interface Props {
	item: FileSystemItem;
	depth?: number;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function Directory({
	item,
	depth = 0,
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
		renameText,
		setRenameText
	});

	return (
		<UIDirectory
			item={item}
			depth={depth}
			isOpened={isOpened}
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
