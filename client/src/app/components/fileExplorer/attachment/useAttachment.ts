import { FileSystemItem } from '@types';

interface args {
	item: FileSystemItem;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function useAttachment({}: args) {
	const x: Partial<args> = {};
	console.log(x);
}
