import { Dispatch, useEffect, useState } from 'react';
import { useConfig, useStore } from '@hooks';
import { ipcRenderer } from 'electron';
import { saveFile } from '@utils';
import { OnChange } from '@monaco-editor/react';
import fs from 'fs';

interface Args {
	text: string;
	setText: Dispatch<string>;
}

export function useEditor({ text, setText }: Args) {
	const [{ currentFile }] = useStore();
	const [unsaved, setUnsaved] = useState(false);
	const [config] = useConfig();

	const handleChange: OnChange = (value, _) => {
		if (!value) return;

		setText(value);
		if (config!['editor.autoSave']) {
			saveFile(currentFile!, value);
		} else {
			setUnsaved(true);
		}
	};

	useEffect(() => {
		let buffer = fs.readFileSync(currentFile!.path);
		console.log(currentFile);
		setText(buffer.toString());

		ipcRenderer.on('saveNote', () => {
			if (config!['editor.autoSave']) {
				saveFile(currentFile!, text);
				setUnsaved(false);
			}
		});
	}, [currentFile]);

	return { unsaved, text, handleChange };
}
