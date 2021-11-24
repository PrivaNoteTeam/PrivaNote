import { encryptFile } from '@shared/data/encryption';
import { getNotebookLocation } from '@shared/notebook';
import { NotebookItem } from '@types';
import axios from 'axios';
import fs from 'fs';
import p from 'path';

let notebookParentLocation: string;

const prepareMetadata = (file: NotebookItem) => {
	let absolutePath = p.join(notebookParentLocation, ...file.paths);
	return {
		id: file.id,
		content: encryptFile(fs.readFileSync(absolutePath))
	};
};

export const addAFile = async (
	file: NotebookItem,
	notebookStructureItem: NotebookItem
) => {
	notebookParentLocation = getNotebookLocation();

	let fileMeta =
		file.mimeType != 'Folder' && file.mimeType != 'Notebook'
			? prepareMetadata(file)
			: {};
	let structureMeta = prepareMetadata(notebookStructureItem);

	try {
		await axios.post('http://localhost:8080/api/vault/add', {
			item: fileMeta,
			notebookStructure: structureMeta
		});
		return;
	} catch (err) {
		console.log(err);
	}
};
