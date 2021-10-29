import React from 'react';
import { useEditor } from './editor/useEditor';
import { UIEditor } from './editor/UIEditor';

interface Props {
	text: string;
	setText: React.Dispatch<string>;
}

export function Editor({ text, setText }: Props) {
	const { unsaved, handleChange, handleDrop } = useEditor({ text, setText });

	return (
		<UIEditor
			unsaved={unsaved}
			text={text}
			handleChange={handleChange}
			handleDrop={handleDrop}
		/>
	);
}
