import { useEditorStore, useStore } from '@hooks';
import { useRelativePath, isFile } from '@utils';

interface Args {
	unsaved: boolean;
}

export function useBreadcrumb({ unsaved }: Args) {
	const [{ notebook, currentFile }] = useStore();
	const [, editorDispatch] = useEditorStore();

	const pathSegments = useRelativePath(notebook!, currentFile!.path).split(
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
				}
			});
		};
	};

	const applyUnsavedChangesIndicator = (segment: string, index: number) => {
		let text = segment;

		if (index === pathSegments.length - 1) {
			text = unsaved ? currentFile!.name.concat('*') : currentFile!.name;
		}

		return text;
	};

	return {
		pathSegments,
		applyDirectoryClickHandler,
		applyUnsavedChangesIndicator
	};
}
