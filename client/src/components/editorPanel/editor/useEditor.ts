import { useEffect, useState } from 'react';
import { useStore } from '../../../hooks';
import { ipcRenderer } from 'electron';
import { saveFile } from '../../../utils';
import fs from 'fs';

export function useEditor() {
	const [{ currentNote }] = useStore();
	const [text, setText] = useState<string>('');
	const [unsaved, setUnsaved] = useState(false);
	const [manualSave, setManualSave] = useState(false);

	const autoSave = true; // ADD TO SETTINGS

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
		if (autoSave) {
			saveFile(currentNote!, event.target.value);
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
