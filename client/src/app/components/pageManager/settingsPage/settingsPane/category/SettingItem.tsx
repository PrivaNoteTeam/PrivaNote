import React from 'react';
import { Setting } from '@types';
import { Switch } from './settingItem/Switch';
import { NumberField } from './settingItem/NumberField';
import { Dropdown } from './settingItem/Dropdown';

type Props = Setting;

export function SettingItem({
	title,
	description,
	ui,
	max,
	min,
	maxLength,
	options
}: Props) {
	let field: JSX.Element | null = null;

	switch (ui) {
		case 'text':
			field = <input className='pn-input'></input>;
			break;
		case 'number':
			field = <NumberField size={maxLength} max={max} min={min} />;
			break;
		case 'dropdown':
			field = <Dropdown items={options!} />;
			break;
		case 'switch':
			field = <Switch />;
			break;
	}

	return (
		<div className='flex justify-between items-center'>
			<div>
				<p className='text-md text-gray-200 font-medium'>{title}</p>
				<p className='text-md text-gray-400'>{description}</p>
			</div>
			<div>{field}</div>
		</div>
	);
}
