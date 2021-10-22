import React from 'react';
import { CloudProviderPage } from './pageManager/cloudProviderPage';

export function PageManager() {
	let render: JSX.Element | null = null;

	render = (
		<CloudProviderPage
			onClose={() => {
				console.log('close');
			}}
		/>
	);

	return render;
}
