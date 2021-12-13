import { deleteItem } from './deleteItem';
import { addItem } from './addItem';
import { updateItem } from './updateItem';
import { downloadItem } from './downloadItem';
import { updateNotebookStructure } from './updateNotebookStructure';

export const db = {
	addItem,
	deleteItem,
	updateItem,
	downloadItem,
	updateNotebookStructure
};
