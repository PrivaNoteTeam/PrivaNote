import React from 'react';
import { FileSystemItem } from '@types';
import { UIFileExplorer } from './fileExplorer/UIFileExplorer';

import { useFileExplorer } from './fileExplorer/useFileExplorer';

interface Props {
	items: FileSystemItem[];
}

export function FileExplorer({ items }: Props) {
	const {
		handleAddDirectoryClick,
		handleAddFileClick,
		handleOuterClick,
		renameText,
		setRenameText
	} = useFileExplorer();

	return (
		<UIFileExplorer
			items={items}
			handleAddDirectoryClick={handleAddDirectoryClick}
			handleAddFileClick={handleAddFileClick}
			handleOuterClick={handleOuterClick}
			renameText={renameText}
			setRenameText={setRenameText}
		/>
	);
}
