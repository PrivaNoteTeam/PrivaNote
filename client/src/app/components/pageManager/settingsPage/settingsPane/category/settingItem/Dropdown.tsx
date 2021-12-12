import React, { useState } from 'react';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';

interface Props {
	items: string[];
	initialValue?: string;
	onClick?: (value: string) => void;
}

export function Dropdown({ items, initialValue, onClick }: Props) {
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
			onClick && onClick(selectedItem);
		}

		setOpened(false);
	};

	return (
		<div>
			<div className='pn-dropdown-active' onClick={toggleOpen}>
				<p>{value}</p>
				<ChevronDownIcon fill='#FFF' />
			</div>
			{opened && (
				<div className='absolute w-60 mt-2'>
					<ul className='pn-dropdown-list'>
						{items.map((item) => (
							<li
								onClick={selectItem}
								className='pn-dropdown-item'
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
