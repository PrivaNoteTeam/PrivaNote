import { useEditorStore } from '@hooks';
import { renameExplorerItem } from '@utils';
import React, { useState } from 'react';

interface Args {
	path: string;
	name: string;
	setRenaming: React.Dispatch<boolean>;
}

export function useRenameField({ name, path, setRenaming }: Args) {
	const [text, setText] = useState(name);
	const [, editorDispatch] = useEditorStore();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' || event.code === '13') {
			renameExplorerItem(path, text).then(() => {
				setRenaming(false);
				editorDispatch({
					type: 'secondarySelect',
					secondarySelection: undefined
				});
			});
		} else if (event.key === 'Escape' || event.code === '27') {
			setRenaming(false);
			editorDispatch({
				type: 'secondarySelect',
				secondarySelection: undefined
			});
			setText(name);
		}
	};

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		event.target.select();
	};

	const handleBlur = () => {
		setRenaming(false);
	};

	return { text, handleChange, handleKeyDown, handleFocus, handleBlur };
}
