import React from 'react';
import { usePageStore } from '@hooks';
import { UICloudProviderPage } from './cloudProviderPage/UICloudProviderPage';

export function CloudProviderPage() {
	const [, pageDispatch] = usePageStore();

	return (
		<UICloudProviderPage
			handleClose={() =>
				pageDispatch({
					type: 'cloudProviderPage',
					cloudProviderPageVisible: false
				})
			}
		/>
	);
}
