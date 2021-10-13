import React from 'react';
import { useBreadcrumb } from './breadcrumb/useBreadcrumb';
import { UIBreadcrumb } from './breadcrumb/UIBreadcrumb';

interface Props {
	unsaved: boolean;
}

export function Breadcrumb({ unsaved }: Props) {
	const {
		pathSegments,
		applyDirectoryClickHandler,
		applyUnsavedChangesIndicator
	} = useBreadcrumb({ unsaved });

	return (
		<UIBreadcrumb
			pathSegments={pathSegments}
			applyDirectoryClickHandler={applyDirectoryClickHandler}
			applyUnsavedChangesIndicator={applyUnsavedChangesIndicator}
		/>
	);
}
