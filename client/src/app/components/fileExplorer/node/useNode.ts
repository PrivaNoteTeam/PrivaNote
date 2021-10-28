import { useEditorStore, useStore } from '@hooks';
import { getFileSystemItems } from '@utils';
import { FileSystemItem } from '@types';

interface Args {
	item: FileSystemItem;
}

export function useNode({ item }: Args) {
	const [{}, dispatch] = useStore();
	const [{ primarySelection, secondarySelection }, editorDispatch] =
		useEditorStore();

	const opened = primarySelection?.path === item.path;

	let children: FileSystemItem[] = opened
		? getFileSystemItems(item.path)
		: [];

	const foldable = item.type === 'directory';

	const primarySelected = primarySelection?.path === item.path;
	const secondarySelected = secondarySelection?.path === item.path;

	const handleClick = () => {
		if (secondarySelected) return;

		if (secondarySelection) {
			editorDispatch({
				type: 'secondarySelect',
				secondarySelection: undefined
			});
		}

		editorDispatch({
			type: 'primarySelect',
			primarySelection: item
		});

		if (item.type === 'note') {
			dispatch({
				type: 'openNote',
				currentFile: {
					name: item.name,
					path: item.path
				}
			});
		}
	};

	return {
		children,
		opened,
		foldable,
		primarySelected,
		secondarySelected,
		handleClick
	};
}
