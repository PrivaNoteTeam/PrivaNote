import p from 'path';
import { getNotebookLocation } from '@shared/notebook';
import { getItemFromStructure } from '@shared/utils/synchronization';
import { NotebookItem, SyncContent, SyncType } from '@types';
import { addAFile, deleteAFile, updateAFile } from '@vault';

let notebookLocation: string;
let notebookStructureItem: NotebookItem;

export const vaultUpstream = async (action: SyncType, content: SyncContent) => {
	notebookLocation = getNotebookLocation();
	notebookStructureItem = await getItemFromStructure(
		p.join(notebookLocation, '.privanote', 'notebookStructure.json')
	);

	switch (action) {
		case 'ADD':
			await addAFile(content.item, notebookStructureItem);
			break;
		case 'DELETE':
			await deleteAFile(content.item, notebookStructureItem);
			break;
		case 'RENAME':
			await updateAFile(content.item, notebookStructureItem);
			break;
		case 'UPDATE':
			await updateAFile(content.item, notebookStructureItem);
			break;
		default:
			break;
	}
};
