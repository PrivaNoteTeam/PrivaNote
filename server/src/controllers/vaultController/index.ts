import { createNotebook } from './createNotebook';

import { deleteItem } from './deleteItem';
import { updateItem } from './updateItem';
import { addItem } from './addItem';
import { downloadItem } from './downloadItem';
export const vaultController = {
	createNotebook,

	addItem,
	updateItem,
	deleteItem,
	downloadItem
};
