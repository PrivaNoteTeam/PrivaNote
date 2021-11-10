import React, { useState } from 'react';

interface Props {
	initialValue?: boolean;
}

export function Switch({ initialValue = false }: Props) {
	const [value, setValue] = useState(initialValue);

	const handleClick = () => {
		setValue(!value);
	};

	return (
		<div
			onClick={handleClick}
			className={`rounded-full h-6 ${
				value ? 'bg-blue-500' : 'bg-gray-400'
			} w-10 p-1 cursor-pointer`}
		>
			<div
				className={`rounded-full w-6 h-6 bg-gray-200 -m-1 shadow-xl ${
					value ? 'ml-auto' : ''
				}`}
			/>
		</div>
	);
}
