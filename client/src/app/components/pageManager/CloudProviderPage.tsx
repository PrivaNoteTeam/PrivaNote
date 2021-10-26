import React from 'react';
import { UICloudProviderPage } from './cloudProviderPage/UICloudProviderPage';
import { useHistory } from 'react-router-dom';

export function CloudProviderPage() {
	let history = useHistory();

	return <UICloudProviderPage handleClose={() => history.push('/')} />;
}
