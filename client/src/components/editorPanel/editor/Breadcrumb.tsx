import React from 'react';
import { useBreadcrumb } from './breadcrumb/useBreadcrumb';
import { EditorAction } from '../../../types';
import { UIBreadcrumb } from './breadcrumb/UIBreadcrumb';

interface Props {
	unsaved: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
}

export function Breadcrumb({ unsaved, editorDispatch }: Props) {
	const {
		pathSegments,
		applyDirectoryClickHandler,
		applyUnsavedChangesIndicator
	} = useBreadcrumb({ unsaved, editorDispatch });

	return (
		<UIBreadcrumb
			pathSegments={pathSegments}
			applyDirectoryClickHandler={applyDirectoryClickHandler}
			applyUnsavedChangesIndicator={applyUnsavedChangesIndicator}
		/>
	);
}
