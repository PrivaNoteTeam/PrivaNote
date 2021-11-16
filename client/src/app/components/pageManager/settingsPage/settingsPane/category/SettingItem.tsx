import React from 'react';
import { Setting } from '@types';
import { Switch } from './settingItem/Switch';
import { NumberField } from './settingItem/NumberField';
import { Dropdown } from './settingItem/Dropdown';
import { useConfig, useStore } from '@hooks';

type Props = Setting & { value: any };

export function SettingItem({
	title,
	description,
	ui,
	max,
	min,
	maxLength,
	options,
	mapsTo,
	value
}: Props) {
	const [{ notebook }] = useStore();
	const [, configDispatch] = useConfig();

	let field: JSX.Element | null = null;

	switch (ui) {
		case 'text':
			field = <input className='pn-input'></input>;
			break;
		case 'number':
			field = (
				<NumberField
					initialValue={value}
					size={maxLength}
					max={max}
					min={min}
				/>
			);
			break;
		case 'dropdown':
			field = <Dropdown initialValue={value} items={options!} />;
			break;
		case 'switch':
			field = (
				<Switch
					initialValue={value}
					onClick={(value) => {
						configDispatch({
							type: 'SET_SETTING',
							payload: {
								configPath: notebook!,
								settingName: mapsTo,
								value
							}
						});
					}}
				/>
			);
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
