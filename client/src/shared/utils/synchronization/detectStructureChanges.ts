import { getNotebookStructure } from './getNotebookStructure';
import p from 'path';

let changes: any;
let cloudFiles: any;
let localFiles: any;
let respond: any;

const retrieveStructureLastModifiedDate = (structure: any) => {
	if (structure.mimeType === 'Notebook') {
		for (let folder of structure.subFolder) {
			if (folder.name === '.privanote') {
				for (let file of folder.subFolder) {
					if (file.name === 'notebookStructure.json') {
						return file.lastModified;
					}
				}
			}
		}
	}
};

const structureSpread = (structure: any, spread: [{}]) => {
	let item = {
		ids: structure.ids,
		name: structure.name,
		mimeType: structure.mimeType,
		paths: structure.paths,
		size: structure.size,
		dateCreated: structure.dateCreated,
		lastModified: structure.lastModified,
		statusModified: structure.statusModified
	};
	spread.push(item);
	if (structure.mimeType === 'Folder' || structure.mimeType === 'Notebook') {
		for (let folder of structure.subFolder) {
			structureSpread(folder, spread);
		}
	}
};

const getItemInFiles = (itemPath: any, fileList: any) => {
	for (let item of fileList) {
		if (p.join(...item.paths) === itemPath) {
			return item;
		}
	}
};

const findAdd = (latestFiles: any, oldFiles: any) => {
	for (let item1 of latestFiles) {
		let itemFound = false;
		let addedItem: any = {};
		for (let item2 of oldFiles) {
			// if (item1.ids.googleDrive === item2.ids.googleDrive) {
			if (p.join(...item1.paths) === p.join(...item2.paths)) {
				itemFound = true;
			}
			if (item1.ids.googleDrive === item2.ids.googleDrive) {
				itemFound = true;
			}
		}
		// console.log('---\nADD: ', itemFound, ':\n', item1, '---\n');
		addedItem = item1;
		if (!itemFound) {
			// console.log('ADD: ', item1);
			let parentItem = getItemInFiles(
				p.join(...addedItem.paths.slice(0, addedItem.paths.length - 1)),
				latestFiles
			);
			changes.push({
				action: 'ADD',
				content: { parentIds: parentItem.ids, item: addedItem }
			});
		}
	}
};

const findDelete = (latestFiles: any, oldFiles: any) => {
	for (let item1 of oldFiles) {
		let itemFound = false;
		let deletedItem: any = {};
		for (let item2 of latestFiles) {
			if (item1.ids.googleDrive === item2.ids.googleDrive) {
				itemFound = true;
			}
		}
		deletedItem = item1;
		if (!itemFound) {
			// console.log('DELETE: ', item1);
			changes.push({ action: 'DELETE', content: { item: deletedItem } });
		}
	}
};

const findRename = (latestFiles: any, oldFiles: any) => {
	for (let item1 of oldFiles) {
		let renameFound = false;
		let renamedItem;
		for (let item2 of latestFiles) {
			if (
				item1.ids.googleDrive === item2.ids.googleDrive &&
				item1.name != item2.name
			) {
				renameFound = true;
				renamedItem = item2;
			}
		}
		if (renameFound) {
			// console.log(`RENAME to ${newName}: `, item1);
			changes.push({
				action: 'RENAME',
				content: { target: item1, item: renamedItem }
			});
		}
	}
};

const findUpdate = (latestFiles: any, oldFiles: any) => {
	for (let item1 of oldFiles) {
		let updateFound = false;
		let updatedItem;
		for (let item2 of latestFiles) {
			if (
				item1.ids.googleDrive === item2.ids.googleDrive &&
				item1.lastModified != item2.lastModified
			) {
				updateFound = true;
				updatedItem = item1;
			}
		}
		if (updateFound) {
			// console.log(`UPDATE: `, item1);
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

const scanAndCompare = (localStructure: any, cloudStructure: any) => {
	let currentDate = new Date(
		retrieveStructureLastModifiedDate(localStructure)
	);
	let cloudDate = new Date(retrieveStructureLastModifiedDate(cloudStructure));
	console.log('localStructure: ', currentDate);
	console.log('cloudStructure: ', cloudDate);

	structureSpread(localStructure, localFiles);
	structureSpread(cloudStructure, cloudFiles);

	if (currentDate > cloudDate) {
		console.log('CURRENT Structure is more recent');
		comparator(localFiles, cloudFiles);
		respond = {
			type: 'CLOUD',
			changes: changes
		};
		// upstream
	} else if (cloudDate > currentDate) {
		console.log('CLOUD Structure is more recent');
		comparator(cloudFiles, localFiles);
		// downstream
		respond = {
			type: 'LOCAL',
			changes: changes
		};
	}
};

export const detectStructureChanges = (cloudStructure: any) => {
	let localStructure = getNotebookStructure();
	changes = [];
	cloudFiles = [];
	localFiles = [];

	scanAndCompare(localStructure, cloudStructure);

	return respond;
};
