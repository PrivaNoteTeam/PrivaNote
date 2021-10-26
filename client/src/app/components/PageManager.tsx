import React from 'react';
import { CloudProviderPage } from './pageManager/cloudProviderPage';
import { SelectCloudProviderPage } from './pageManager/selectCloudProviderPage';
import { Route } from 'react-router';

export function PageManager() {
	return (
		<>
			<Route path='/cloudprovider' children={<CloudProviderPage />} />
			<Route
				path='/cloudprovider/select'
				children={<SelectCloudProviderPage />}
			/>
		</>
	);
}
