//import { useStore } from "@hooks";
import { FileSystemItem } from '@types';

interface Args {
	item: FileSystemItem;
}

export function useNode({ item }: Args) {
	//const [{ currentFile }, dispatch] = useStore();
	console.log(item);
	return {};
}
