import React from 'react';
import { Setting } from '@types';

type Props = Setting;

export function SettingItem({ title, description }: Props) {
	return (
		<div>
			<p className='text-md text-gray-200 font-medium'>{title}</p>
			<p className='text-md text-gray-400'>{description}</p>
		</div>
	);
}
