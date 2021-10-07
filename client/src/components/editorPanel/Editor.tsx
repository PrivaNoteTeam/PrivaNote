import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { ipcRenderer } from 'electron';
import { FileItem, FileSystemItem } from '../../types';
import { Breadcrumb } from './editor/Breadcrumb';
import { saveFile } from '../../utils/saveFile';

interface Props {
	currentFile: FileItem;
	setSelection: React.Dispatch<FileSystemItem | undefined>;
}

export function Editor({ currentFile, setSelection }: Props) {
	const [text, setText] = useState<string>('');
	const [unSaved, setUnsaved] = useState(false);
	const [manualSave, setManualSave] = useState(false);

	const autoSave = true; // ADD TO SETTINGS

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
		if (autoSave) saveFile(currentFile, event.target.value);
		else setUnsaved(true);
	};

	if (manualSave) {
		saveFile(currentFile, text);
		setUnsaved(false);
		setManualSave(false);
	}

	useEffect(() => {
		let buffer = fs.readFileSync(currentFile.path);
		setText(buffer.toString());

		ipcRenderer.on('saveNote', () => {
			setManualSave(true);
		});
	}, [currentFile]);

	return (
		<div className='bg-gray-900 flex-grow flex flex-col'>
			<Breadcrumb
				currentFile={currentFile}
				unSaved={unSaved}
				setSelection={setSelection}
			/>
			<div className='overflow-auto flex-grow w-full'>
				<textarea
					onChange={handleChange}
					value={text}
					className='w-full h-full bg-transparent outline-none border-none text-gray-200 font-mono p-8 resize-none'
				></textarea>
			</div>
		</div>
	);
}
