import React from 'react';
import { settings } from '@shared/data/settings';
import { Category } from './settingsPane/Category';
import { useConfig } from '@app/hooks';

interface Props {
	searchFilter: string;
}

export function SettingsPane({ searchFilter }: Props) {
	const [config] = useConfig();

	let filteredSettingsData = [...settings];

	if (searchFilter.length !== 0) {
		filteredSettingsData = settings.map((category) => {
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

	filteredSettingsData = filteredSettingsData.filter((category) => {
		return category.settings.length > 0;
	});

	filteredSettingsData = filteredSettingsData.filter((category) => {
		return category.settings.length > 0;
	});

	let filteredSettings = filteredSettingsData.map((category) => {
		return {
			...category,
			settings: category.settings.map((setting) => {
				return {
					...setting,
					value: config![setting.mapsTo]
				};
			})
		};
	});

	return (
		<div className='w-full'>
			{filteredSettings.map((category) => (
				<Category {...category} />
			))}
		</div>
	);
}
