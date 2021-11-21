import React from 'react';
import { CloudProviderPage } from './pageManager/cloudProviderPage';
import { SelectCloudProviderPage } from './pageManager/selectCloudProviderPage';
import { Route } from 'react-router';
import { SettingsPage } from './pageManager/SettingsPage';

export function PageManager() {
	return (
		<>
			<Route path='/cloudprovider' children={<CloudProviderPage />} />
			<Route
				path='/cloudprovider/select'
				children={<SelectCloudProviderPage />}
			/>
			<Route path='/settings' children={<SettingsPage />} />
		</>
	);
}
