import React, { useState } from 'react';

interface Props {
	onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ onSearch }: Props) {
	const [value, setValue] = useState('');
	const [focused, setFocused] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		if (onSearch) onSearch(event);
	};

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	return (
		<input
			className={`px-2 py-1 w-48 bg-gray-900 border ${
				focused ? 'border-blue-500' : 'border-gray-700'
			} rounded-md text-gray-200 text-md outline-none`}
			placeholder='Search settings'
			onChange={handleChange}
			onFocus={handleFocus}
			onBlur={handleBlur}
			value={value}
		></input>
	);
}
