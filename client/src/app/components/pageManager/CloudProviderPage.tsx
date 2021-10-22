import React from 'react';
//import { useCloudProviderPage } from './cloudProviderPage/useCloudProviderPage';
import { UICloudProviderPage } from './cloudProviderPage/UICloudProviderPage';

interface Props {
	onClose: () => void;
}

export function CloudProviderPage({ onClose }: Props) {
	return <UICloudProviderPage handleClose={onClose} />;
}
