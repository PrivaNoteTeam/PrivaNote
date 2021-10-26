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
	const [{ currentNote }] = useStore();
	const [unsaved, setUnsaved] = useState(false);
	const [manualSave, setManualSave] = useState(false);

	const autoSave = true; // ADD TO SETTINGS

	const handleChange: OnChange = (value, _) => {
		if (!value) return;

		setText(value);
		if (autoSave) {
			saveFile(currentNote!, value);
		} else {
			setUnsaved(true);
		}
	};

	if (manualSave) {
		saveFile(currentNote!, text);
		setUnsaved(false);
		setManualSave(false);
	}

	useEffect(() => {
		let buffer = fs.readFileSync(currentNote!.path);
		setText(buffer.toString());

		ipcRenderer.on('saveNote', () => {
			setManualSave(true);
		});
	}, [currentNote]);

	return { unsaved, text, handleChange };
}
