import React from 'react';
import { useEditorPanel } from './editorPanel/useEditorPanel';
import { UIEditorPanel } from './editorPanel/UIEditorPanel';

export function EditorPanel() {
	const { text, setText, livePreviewVisiable } = useEditorPanel();

	return (
		<UIEditorPanel
			livePreviewVisiable={livePreviewVisiable}
			text={text}
			setText={setText}
		/>
	);
}
