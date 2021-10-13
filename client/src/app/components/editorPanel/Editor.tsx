import React from 'react';
import { useEditor } from './editor/useEditor';
import { UIEditor } from './editor/UIEditor';

export function Editor() {
	const { unsaved, text, handleChange } = useEditor();

	return (
		<UIEditor unsaved={unsaved} text={text} handleChange={handleChange} />
	);
}
