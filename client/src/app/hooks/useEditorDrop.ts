import fs from 'fs';
import { useStore } from '@hooks';
import { useRef } from 'react';
import { ipcRenderer } from 'electron';

type CallbackFunction = (
	path: string,
	cursorPosition: [number, number]
) => void;

export function useEditorDrop() {
	const [{ currentFile, notebook }] = useStore();
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

			fs.copyFile(file.path, copyPath, (err) => {
				if (err) {
					console.log('Drop Error Found: ', err);
				} else {
					ipcRenderer.send('createFile', copyPath);
				}
			});

			const copyPathRelative = copyPath.substring(
				notebook!.lastIndexOf('/') + 1
			);

			if (callbackRef.current)
				callbackRef.current(copyPathRelative, cursorPosition);
		});
	};

	const init = (cb: CallbackFunction) => {
		callbackRef.current = cb;
	};

	return { drop, init };
}
