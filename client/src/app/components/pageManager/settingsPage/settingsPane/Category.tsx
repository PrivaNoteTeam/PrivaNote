import React from 'react';
import { Setting } from '@types';
import { SettingItem } from './category/SettingItem';

interface Props {
	title: string;
	settings: Setting[];
}

export function Category({ title, settings }: Props) {
	console.log(settings);
	return (
		<div>
			<h1 className='text-white text-2xl font-medium'>{title}</h1>
			{settings.map((setting) => (
				<div className='my-0.5'>
					<SettingItem {...setting} />
					<hr className='text-gray-700 mt-0.5' />
				</div>
			))}
		</div>
	);
}