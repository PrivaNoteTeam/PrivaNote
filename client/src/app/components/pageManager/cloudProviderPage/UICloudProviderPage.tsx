import React from 'react';
import { Page } from '../Page';

interface Props {
	handleClose: () => void;
}

export function UICloudProviderPage({ handleClose }: Props) {
	return (
		<Page onClose={handleClose}>
			<div>
				<h1>Hello, world!</h1>
			</div>
		</Page>
	);
}
