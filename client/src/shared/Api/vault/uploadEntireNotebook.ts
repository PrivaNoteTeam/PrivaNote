import { getNotebookParentLocation } from '@shared/notebook';
import { NotebookStructure } from '@types';
import p from 'path';
import fs from 'fs';
import { encryptFile } from '@shared/data/encryption';
import axios from 'axios';
import { removeConnectedProvider } from '@synchronization';

let notebookParentLocation: string;

const createMeta = (notebookStructure: NotebookStructure) => {
	let meta: any = [];

	for (let notebookItem of notebookStructure) {
		if (
			notebookItem.mimeType != 'Notebook' &&
			notebookItem.mimeType != 'Folder'
		) {
			let absolutePath = p.join(
				notebookParentLocation,
				...notebookItem.paths
			);
			meta.push({
				id: notebookItem.id,
				content: encryptFile(fs.readFileSync(absolutePath))
			});
		}
	}

	return meta;
};

export const uploadEntireNotebook = async (
	notebookStructure: NotebookStructure
) => {
	notebookParentLocation = getNotebookParentLocation();

	const metadata = createMeta(notebookStructure);

	console.log(metadata);
	try {
		const res: any = await axios.post(
			'http://localhost:8080/api/vault/create-notebook',
			{
				notebookStructure: metadata
			}
		);
		return res;
	} catch (error) {
		console.log(error);
		removeConnectedProvider('PrivaNote Vault');
	}
};
