import React from 'react';
import { useEditorPanel } from './editorPanel/useEditorPanel';
import { UIEditorPanel } from './editorPanel/UIEditorPanel';

export function EditorPanel() {
	const {
		fileExplorerVisible,
		primarySelection,
		secondarySelection,
		isRenaming,
		editorDispatch
	} = useEditorPanel();

	return (
		<UIEditorPanel
			primarySelection={primarySelection}
			secondarySelection={secondarySelection}
			isRenaming={isRenaming}
			editorDispatch={editorDispatch}
			fileExplorerVisible={fileExplorerVisible}
		/>
	);
}
