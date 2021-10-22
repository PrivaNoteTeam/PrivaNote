import React from 'react';
import { usePageStore } from '@hooks';
import { CloudProviderPage } from './pageManager/cloudProviderPage';

export function PageManager() {
	const [{ cloudProviderPageVisible }] = usePageStore();

	let render: JSX.Element | null = null;

	if (cloudProviderPageVisible) {
		render = <CloudProviderPage />;
	}

	return render;
}
