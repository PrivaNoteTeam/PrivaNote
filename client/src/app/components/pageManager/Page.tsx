import React, { PropsWithChildren } from 'react';
import { UIPage } from './page/UIPage';

interface Props {
	onClose: () => void;
}

export function Page({ children, onClose }: PropsWithChildren<Props>) {
	return <UIPage handleCloseClick={onClose}>{children}</UIPage>;
}
