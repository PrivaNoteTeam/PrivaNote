import React from 'react';
import { Setting } from '@types';
import { Switch } from './settingItem/Switch';

type Props = Setting;

export function SettingItem({ title, description, ui, maxLength }: Props) {
	let field: JSX.Element | null = null;

	switch (ui) {
		case 'text':
			field = <input className='pn-input'></input>;
			break;
		case 'number':
			field = (
				<input
					type='number'
					className='pn-input'
					size={maxLength}
					maxLength={maxLength}
				></input>
			);
			break;
		case 'dropdown':
			field = <p>Dropdown WIP</p>;
			break;
		case 'switch':
			field = <Switch />;
			break;
		default:
			field = null;
			break;
	}

	return (
		<div className='flex justify-between w-full'>
			<div>
				<p className='text-md text-gray-200 font-medium'>{title}</p>
				<p className='text-md text-gray-400'>{description}</p>
			</div>
			<div className=''>{field}</div>
		</div>
	);
}
