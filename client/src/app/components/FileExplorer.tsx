import React from 'react';
import { UIFileExplorer } from './fileExplorer/UIFileExplorer';
import { useFileExplorer } from './fileExplorer/useFileExplorer';

export function FileExplorer() {
	const {
		items,
		handleAddDirectoryClick,
		handleAddFileClick,
		handleOuterClick
	} = useFileExplorer();

	return (
		<UIFileExplorer
			items={items}
			handleAddDirectoryClick={handleAddDirectoryClick}
			handleAddFileClick={handleAddFileClick}
			handleOuterClick={handleOuterClick}
		/>
	);
}
