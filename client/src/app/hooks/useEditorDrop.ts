import fs from 'fs';
import { useStore } from '@hooks';

export function useEditorDrop() {
	const [{ currentFile }] = useStore();

	const currentFileParentPath = currentFile!.path.substring(
		0,
		currentFile!.path.lastIndexOf('/')
	);

	const drop = (files: any[], cursorPosition: [x: number, y: number]) => {
		console.log(cursorPosition);

		files.forEach((file: File) => {
			fs.copyFileSync(file.path, `${currentFileParentPath}/${file.name}`);
		});
	};

	const insert = (text: string, cursorPosition: [x: number, y: number]) => {
		console.log(text, cursorPosition);
	};

	return { drop, insert };
}
