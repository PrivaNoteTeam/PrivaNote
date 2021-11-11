import React, { useState } from 'react';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';

interface Props {
	items?: string[];
	initialValue?: string;
}

export function Dropdown({ items = [], initialValue = 'Active Item' }: Props) {
	const [opened, setOpened] = useState(false);

	const toggleOpen = () => {
		setOpened(!opened);
	};

	// testing items
	items = ['Item 1', 'Item 2', 'Item 3', 'Longer Item 4'];

	return (
		<div>
			<div
				className='pn-input flex justify-between pr-1 w-60 cursor-pointer'
				onClick={toggleOpen}
			>
				<p className='text-white'>{initialValue}</p>
				<ChevronDownIcon fill='#FFF' />
			</div>
			{opened && (
				<div className='absolute w-60 mt-2'>
					<ul className='bg-gray-900 border border-gray-700 rounded-md'>
						{items.map((item) => (
							<li className='text-white px-2 py-1 hover:bg-blue-600 cursor-pointer select-none'>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
