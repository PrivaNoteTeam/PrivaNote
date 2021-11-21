import React from 'react';
import { settings } from '@shared/data/settings';
import { Category } from './settingsPane/Category';

interface Props {
	searchFilter: string;
}

export function SettingsPane({ searchFilter }: Props) {
	let filteredSettings = [...settings];

	if (searchFilter.length !== 0) {
		filteredSettings = settings.map((category) => {
			return {
				...category,
				settings: category.settings.filter((setting) => {
					return (
						setting.title.includes(searchFilter) ||
						setting.description.includes(searchFilter)
					);
				})
			};
		});
	}

	filteredSettings = filteredSettings.filter((category) => {
		return category.settings.length > 0;
	});

	return (
		<div className='w-full'>
			{filteredSettings.map((category) => (
				<Category {...category} />
			))}
		</div>
	);
}
