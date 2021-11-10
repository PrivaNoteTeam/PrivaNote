import React from 'react';
import { useHistory } from 'react-router';
import { Page } from './Page';
import { SettingsPane } from './settingsPage/SettingsPane';

export function SettingsPage() {
	let history = useHistory();

	const handleClose = () => {
		history.push('/');
	};

	return (
		<Page onClose={handleClose}>
			<div className='flex space-x-6'>
				<div className='flex flex-col space-y-4'>
					<input
						className='py-0.5 px-1 bg-gray-700 border border-blue-500 rounded-md text-gray-200 text-sm outline-none'
						placeholder='Search settings'
					></input>

					{/* Category Tree */}
					<div>
						<h2 className='text-lg text-white '>Categories</h2>
						<div>{/* Nodes */}</div>
					</div>
				</div>
				<div className='flex-grow'>
					<SettingsPane />
				</div>
			</div>
		</Page>
	);
}
