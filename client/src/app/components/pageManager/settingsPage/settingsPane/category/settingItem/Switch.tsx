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
			className={`pn-switch ${value ? 'pn-switch-on' : 'pn-switch-off'}`}
		>
			<div
				className={`pn-switch-thumb ${
					value ? 'pn-switch-thumb-on' : 'pn-switch-thumb-off'
				}`}
			/>
		</div>
	);
}
