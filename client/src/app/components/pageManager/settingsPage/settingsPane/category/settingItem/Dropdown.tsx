import React, { useState } from 'react';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';

interface Props {
	items?: string[];
	initialValue?: string;
}

export function Dropdown({ items = [], initialValue }: Props) {
	if (!initialValue) initialValue = items[0];

	const [opened, setOpened] = useState(false);
	const [value, setValue] = useState(initialValue);

	const toggleOpen = () => {
		setOpened(!opened);
	};

	const selectItem = (event: React.MouseEvent<HTMLLIElement>) => {
		let selectedItem = (event.target as HTMLElement).textContent;

		if (selectedItem && value !== selectedItem) {
			setValue(selectedItem);
		}

		setOpened(false);
	};

	// testing items
	items = ['Item 1', 'Item 2', 'Item 3', 'Longer Item 4'];

	return (
		<div>
			<div
				className='pn-input flex justify-between pr-1 w-60 cursor-pointer'
				onClick={toggleOpen}
			>
				<p className='text-white'>{value}</p>
				<ChevronDownIcon fill='#FFF' />
			</div>
			{opened && (
				<div className='absolute w-60 mt-2'>
					<ul className='bg-gray-900 border border-gray-700 rounded-md'>
						{items.map((item) => (
							<li
								onClick={selectItem}
								className='text-white px-2 py-1 hover:bg-blue-600 cursor-pointer select-none'
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
