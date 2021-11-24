import { getNotebookParentLocation } from '@shared/notebook';
import { NotebookStructure } from '@types';
import p from 'path';
import fs from 'fs';
import { encryptFile } from '@shared/data/encryption';
import axios from 'axios';
import { removeConnectedProvider } from '@synchronization';

let notebookParentLocation: string;

const createMeta = (notebookStructure: NotebookStructure) => {
	const meta = notebookStructure.filter((notebookItem) => {
		if (notebookItem.mimeType === 'Notebook') {
			// return notebookItem;
			return {
				id: notebookItem.id,
				content: ''
			};
		} else if (
			notebookItem.mimeType != 'Notebook' &&
			notebookItem.mimeType != 'Folder'
		) {
			let absolutePath = p.join(
				notebookParentLocation,
				...notebookItem.paths
			);

			// notebookItem.content = encryptFile(fs.readFileSync(absolutePath));
			// return notebookItem;
			return {
				id: notebookItem.id,
				content: encryptFile(fs.readFileSync(absolutePath))
			};
		}
		return false;
	});

	return meta;
};

export const uploadEntireNotebook = async (
	notebookStructure: NotebookStructure
) => {
	notebookParentLocation = getNotebookParentLocation();

	const metadata = createMeta(notebookStructure);
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
