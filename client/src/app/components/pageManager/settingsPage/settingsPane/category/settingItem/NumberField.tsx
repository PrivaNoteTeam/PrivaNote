import React, { useState } from 'react';

interface Props {
	size?: number;
	min?: number;
	max?: number;
	initialValue?: number;
}

export function NumberField({ initialValue = 0, ...inputProps }: Props) {
	const [value, setValue] = useState<number | undefined>(initialValue);

	console.log(value);

	const increment = () => {
		// if value is blank, replace with default value on increment
		if (value === undefined) {
			setValue(initialValue);
			return;
		}

		if (inputProps.max && value >= inputProps.max) {
			return;
		}

		setValue(value + 1);
	};

	const decrement = () => {
		// if value is blank, replace with default value on increment
		if (value === undefined) {
			setValue(initialValue);
			return;
		}

		if (inputProps.min && value <= inputProps.min) {
			return;
		}

		setValue(value - 1);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === '') {
			setValue(undefined);
			return;
		}

		setValue(+event.target.value);
	};

	return (
		<div className='w-full'>
			<div className='flex w-min'>
				<button
					onClick={decrement}
					className='pn-number-decrement select-none'
				>
					-
				</button>
				<input
					type='number'
					className='pn-number-input text-center'
					{...inputProps}
					value={value}
					onChange={handleChange}
				/>
				<button
					onClick={increment}
					className='pn-number-increment select-none'
				>
					+
				</button>
			</div>
		</div>
	);
}
