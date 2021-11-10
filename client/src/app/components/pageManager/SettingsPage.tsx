import React from 'react';
import { useHistory } from 'react-router';
import { Page } from './Page';

export function SettingsPage() {
	let history = useHistory();

	const handleClose = () => {
		history.push('/');
	};

	return (
		<Page onClose={handleClose}>
			<h1>Settings</h1>
		</Page>
	);
}
