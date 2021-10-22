import React from 'react';
import { usePageStore } from '@hooks';
import { CloudProviderPage } from './pageManager/cloudProviderPage';
import { SelectCloudProviderPage } from './pageManager/selectCloudProviderPage';

export function PageManager() {
	const [{ cloudProviderPageVisible, selectCloudProviderPageVisible }] =
		usePageStore();

	let render: JSX.Element | null = null;

	if (cloudProviderPageVisible) {
		render = <CloudProviderPage />;
	} else if (selectCloudProviderPageVisible) {
		render = <SelectCloudProviderPage />;
	}

	return render;
}
