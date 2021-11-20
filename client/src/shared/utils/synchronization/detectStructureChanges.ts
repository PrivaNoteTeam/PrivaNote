import { getNotebookName } from '@shared/notebook';
import { getNotebookStructure, getParentFromStructure } from '@synchronization';
import {
	NotebookItem,
	NotebookStructure,
	SyncAction,
	SyncResponse
} from '@types';
import p from 'path';

let changes: SyncAction[];
// let cloudFiles: any;
// let localFiles: any;
let respond: SyncResponse;

const retrieveLastModified = (structure: NotebookStructure) => {
	try {
		for (let notebookItem of structure) {
			if (
				notebookItem.name === 'notebookStructure.json' &&
				p.join(...notebookItem.paths) ===
					p.join(
						getNotebookName(),
						'.privanote',
						'notebookStructure.json'
					)
			) {
				return notebookItem.lastModified;
			}
		}
		throw Error('Item not found in structure');
	} catch (err) {
		console.log(err);
		return;
	}
};

const findAdd = (
	latestFiles: NotebookStructure,
	oldFiles: NotebookStructure
) => {
	for (let item1 of latestFiles) {
		let itemFound = false;
		let addedItem: NotebookItem;
		for (let item2 of oldFiles) {
			if (item1.id === item2.id) {
				itemFound = true;
			}
		}
		addedItem = item1;
		if (!itemFound) {
			let parentItem = getParentFromStructure(addedItem, latestFiles);
			changes.push({
				action: 'ADD',
				content: { parent: parentItem, item: addedItem }
			});
		}
	}
};

const findDelete = (
	latestFiles: NotebookStructure,
	oldFiles: NotebookStructure
) => {
	for (let item1 of oldFiles) {
		let itemFound = false;
		let deletedItem: NotebookItem;
		for (let item2 of latestFiles) {
			if (item1.id === item2.id) {
				itemFound = true;
			}
		}
		deletedItem = item1;
		if (!itemFound) {
			changes.push({ action: 'DELETE', content: { item: deletedItem } });
		}
	}
};

const findRename = (
	latestFiles: NotebookStructure,
	oldFiles: NotebookStructure
) => {
	for (let item1 of oldFiles) {
		let renameFound = false;
		let renamedItem;
		for (let item2 of latestFiles) {
			if (item1.id === item2.id && item1.name != item2.name) {
				renameFound = true;
				renamedItem = item2;
			}
		}
		if (renameFound && renamedItem) {
			changes.push({
				action: 'RENAME',
				content: { renamedTarget: item1, item: renamedItem }
			});
		}
	}
};

const findUpdate = (
	latestFiles: NotebookStructure,
	oldFiles: NotebookStructure
) => {
	for (let item1 of oldFiles) {
		let updateFound = false;
		let updatedItem;
		for (let item2 of latestFiles) {
			if (
				item1.id === item2.id &&
				item1.lastModified != item2.lastModified
			) {
				updateFound = true;
				updatedItem = item1;
			}
		}
		if (updateFound && updatedItem) {
			changes.push({ action: 'UPDATE', content: { item: updatedItem } });
		}
	}
};

const comparator = (latestFiles: any, oldFiles: any) => {
	findAdd(latestFiles, oldFiles);
	findDelete(latestFiles, oldFiles);
	findRename(latestFiles, oldFiles);
	findUpdate(latestFiles, oldFiles);
};

const scanAndCompare = (
	localStructure: NotebookStructure,
	cloudStructure: NotebookStructure
) => {
	let currentDate = new Date(retrieveLastModified(localStructure)!);
	let cloudDate = new Date(retrieveLastModified(cloudStructure)!);
	console.log('localStructure: ', currentDate);
	console.log('cloudStructure: ', cloudDate);

	if (currentDate > cloudDate) {
		console.log('CURRENT Structure is more recent');
		// comparator(localStructure, cloudStructure);
		// respond = {
		// 	type: 'CLOUD',
		// 	changes: changes
		// };
		// upstream
	} else if (cloudDate > currentDate) {
		console.log('CLOUD Structure is more recent');
		comparator(cloudStructure, localStructure);
		// downstream
		respond = {
			type: 'LOCAL',
			changes: changes
		};
	}
};

export const detectStructureChanges = (cloudStructure: NotebookStructure) => {
	let localStructure = getNotebookStructure();
	changes = [];

	scanAndCompare(localStructure, cloudStructure);

	return respond;
};
