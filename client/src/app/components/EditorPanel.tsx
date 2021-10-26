import React from 'react';
import { useEditorPanel } from './editorPanel/useEditorPanel';
import { UIEditorPanel } from './editorPanel/UIEditorPanel';

export function EditorPanel() {
	const { text, setText } = useEditorPanel();

	return <UIEditorPanel text={text} setText={setText} />;
}
