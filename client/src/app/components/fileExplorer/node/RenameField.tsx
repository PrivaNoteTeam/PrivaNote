import React from 'react';
import { UIRenameField } from './renameField/UIRenameField';
import { useRenameField } from './renameField/useRenameField';

interface Props {
	name: string;
	path: string;
	setRenaming: React.Dispatch<boolean>;
}

export function RenameField({ name, path, setRenaming }: Props) {
	const { text, handleChange, handleKeyDown, handleFocus, handleBlur } =
		useRenameField({ name, path, setRenaming });

	return (
		<UIRenameField
			text={text}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			onFocus={handleFocus}
			onBlur={handleBlur}
		/>
	);
}
