import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Page } from './Page';
import { NavigationTree } from './settingsPage/NavigationTree';
import { SettingsPane } from './settingsPage/SettingsPane';
import { SearchBar } from './settingsPage/SearchBar';

export function SettingsPage() {
	const [searchFilter, setSearchFilter] = useState('');
	let history = useHistory();

	const handleClose = () => {
		history.push('/');
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setSearchFilter(event.target.value.trim());
		}
	};

	console.log('search filter: ', searchFilter);

	return (
		<Page onClose={handleClose}>
			<div className='flex space-x-6'>
				<div className='flex flex-col space-y-4'>
					<SearchBar onSearch={handleSearch} />
					<NavigationTree />
				</div>
				<div className='flex-grow'>
					<SettingsPane searchFilter={searchFilter} />
				</div>
			</div>
		</Page>
	);
}
