import React from 'react';
import { useStore } from '../../../../useStore';
import { useRelativePath } from '../../../../utils/useRelativePath';
import { isFile } from '../../../../utils/isFile';
import { EditorAction } from '../../../../types';

interface Args {
	unsaved: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
}

export function useBreadcrumb({ unsaved, editorDispatch }: Args) {
	const [{ notebook, currentNote }] = useStore();

	const pathSegments = useRelativePath(notebook!, currentNote!.path).split(
		/[\/\\]/
	);

	const applyDirectoryClickHandler = (part: string, index: number) => {
		return () => {
			let path = pathSegments
				.slice(0, index + 1)
				.join('/')
				.replace(/^/, notebook!.concat('/'));

			editorDispatch({
				type: 'primarySelect',
				primarySelection: {
					name: part,
					path,
					type: isFile(path) ? 'note' : 'directory'
				},
				isRenaming: false // this is NOT supposed to be here. Delete ASAP
			});
		};
	};

	const applyUnsavedChangesIndicator = (segment: string, index: number) => {
		let text = segment;

		if (index === pathSegments.length - 1) {
			text = unsaved ? currentNote!.name.concat('*') : currentNote!.name;
		}

		return text;
	};

	return {
		pathSegments,
		applyDirectoryClickHandler,
		applyUnsavedChangesIndicator
	};
}
