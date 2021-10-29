import fs from 'fs';
import { useStore } from '@hooks';
import { useRef } from 'react';

type CallbackFunction = (
	path: string,
	cursorPosition: [number, number]
) => void;

export function useEditorDrop() {
	const [{ currentFile }] = useStore();
	const currentFileParentPath = currentFile!.path.substring(
		0,
		currentFile!.path.lastIndexOf('/')
	);

	const callbackRef = useRef<CallbackFunction>((_, __) => {
		return;
	});

	const drop = (files: any[], cursorPosition: [x: number, y: number]) => {
		files.forEach((file: File) => {
			const copyPath = `${currentFileParentPath}/${file.name}`;
			fs.copyFileSync(file.path, copyPath);

			if (callbackRef.current) {
				callbackRef.current(copyPath, cursorPosition);
			}
		});
	};

	const init = (cb: CallbackFunction) => {
		callbackRef.current = cb;
	};

	return { drop, init };
}
