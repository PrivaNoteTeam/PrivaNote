import React from 'react';
import { useEditorPanel } from './editorPanel/useEditorPanel';
import { UIEditorPanel } from './editorPanel/UIEditorPanel';

export function EditorPanel() {
	const { fileExplorerVisible } = useEditorPanel();

	return <UIEditorPanel fileExplorerVisible={fileExplorerVisible} />;
}
