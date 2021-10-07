import React from 'react';
import { useEditor } from './editor/useEditor';
import { UIEditor } from './editor/UIEditor';
import { EditorAction } from '../../types';

interface Props {
	editorDispatch: React.Dispatch<EditorAction>;
}

export function Editor({ editorDispatch }: Props) {
	const { unsaved, text, handleChange } = useEditor();

	return (
		<UIEditor
			unsaved={unsaved}
			text={text}
			editorDispatch={editorDispatch}
			handleChange={handleChange}
		/>
	);
}
