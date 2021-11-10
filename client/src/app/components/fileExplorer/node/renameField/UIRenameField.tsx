import React from 'react';

interface Props {
	text: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur: () => void;
}

export function UIRenameField({
	text,
	onChange,
	onKeyDown,
	onFocus,
	onBlur
}: Props) {
	return (
		<input
			type='text'
			value={text}
			autoFocus
			onChange={onChange}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			onBlur={onBlur}
			className='bg-transparent outline-none text-white text-sm'
		/>
	);
}
