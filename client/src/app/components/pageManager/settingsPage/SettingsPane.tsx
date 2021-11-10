import React from 'react';
import { settings } from '@shared/data/settings';
import { Category } from './settingsPane/Category';
export function SettingsPane() {
	return (
		<div className='w-full'>
			{settings.map((category) => (
				<Category {...category} />
			))}
		</div>
	);
}
