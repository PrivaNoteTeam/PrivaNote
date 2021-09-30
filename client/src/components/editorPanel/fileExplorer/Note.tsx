import React, { useState } from 'react';
import { FileSystemItem } from '../../../types';

interface Props {
	item: FileSystemItem;
}

export function Note({ item }: Props) {
	const [isOpened, _] = useState(false);

	return (
		<div className='flex select-none cursor-pointer py-0.5 pl-8 hover:bg-gray-700'>
			<p
				className={`${
					isOpened ? 'text-white' : 'text-gray-300'
				} text-sm`}
			>
				{item.name}
			</p>
		</div>
	);
}
