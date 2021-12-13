import { encryptFile } from '@shared/data/encryption';
import { getNotebookParentLocation } from '@shared/notebook';
import { removeConnectedProvider } from '@shared/utils/synchronization';
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
	notebookParentLocation = getNotebookParentLocation();

	let fileMeta =
		file.mimeType != 'Folder' && file.mimeType != 'Notebook'
			? prepareMetadata(file)
			: {};
	let structureMeta = prepareMetadata(notebookStructureItem);

	try {
		await axios.post('https://privanote.herokuapp.com/api/vault/add', {
			item: fileMeta,
			notebookStructure: structureMeta
		});
		return;
	} catch (err) {
		if (
			err.response.status === 400 &&
			err.response.data === 'Not authenticated to Vault.'
		) {
			console.log(err.response.data);
			removeConnectedProvider('PrivaNote Vault');
		} else if (err.response.status === 400) {
			console.log(err.response.data);
		} else {
			console.log(err);
			removeConnectedProvider('PrivaNote Vault');
		}
	}
};
