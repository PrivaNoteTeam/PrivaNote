import { encryptFile } from '@shared/data/encryption';
import { getNotebookParentLocation } from '@shared/notebook';
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

export const deleteAFile = async (
	file: NotebookItem,
	notebookStructureItem: NotebookItem
) => {
	notebookParentLocation = getNotebookParentLocation();

	let structureMeta = prepareMetadata(notebookStructureItem);

	try {
		await axios.post('http://localhost:8080/api/vault/delete', {
			itemId: file.id,
			notebookStructure: structureMeta
		});
		return;
	} catch (err) {
		console.log(err);
	}
};
