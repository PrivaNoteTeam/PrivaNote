import React from 'react';
import { Setting } from '@types';
import { SettingItem } from './category/SettingItem';

interface Props {
	title: string;
	settings: Setting[];
}

export function Category({ title, settings }: Props) {
	return (
		<div>
			<h1 className='text-white text-2xl font-medium'>{title}</h1>
			{settings.map((setting) => (
				<div className=''>
					<SettingItem {...setting} />
					<hr className='border-gray-700 my-6' />
				</div>
			))}
		</div>
	);
}
