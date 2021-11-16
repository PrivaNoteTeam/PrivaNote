import { Dispatch, useEffect, useState } from 'react';
import { useStore } from '@hooks';
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
	const [manualSave, setManualSave] = useState(false);

	const autoSave = true; // ADD TO SETTINGS

	const handleChange: OnChange = (value, _) => {
		if (!value) return;

		setText(value);
		if (autoSave) {
			saveFile(currentFile!, value);
		} else {
			setUnsaved(true);
		}
	};

	if (manualSave) {
		saveFile(currentFile!, text);
		setUnsaved(false);
		setManualSave(false);
	}

	useEffect(() => {
		let buffer = fs.readFileSync(currentFile!.path);
		console.log(currentFile);
		setText(buffer.toString());

		ipcRenderer.on('saveNote', () => {
			setManualSave(true);
		});
	}, [currentFile]);

	return { unsaved, text, handleChange };
}
