import React from 'react';
import { settings } from '@shared/data/settings';

export function NavigationTree() {
	return (
		<div>
			<h2 className='text-lg text-white '>Categories</h2>
			<ul>
				{settings.map((category) => (
					<li className='text-gray-400 hover:text-white text-sm cursor-pointer my-1'>
						{category.title}
					</li>
				))}
			</ul>
		</div>
	);
}
