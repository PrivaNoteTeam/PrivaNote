import { getNotebookStructure } from './getNotebookStructure';
// import p from 'path';

let changes: any = [];
let cloudFiles: any = [];
let localFiles: any = [];

const retrieveStructureLastModifiedDate = (structure: any) => {
	if (structure.mimeType === 'Notebook' || structure.mimeType === 'Folder') {
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

const findAdd = (latestFiles: any, oldFiles: any) => {
	for (let item1 of latestFiles) {
		let itemFound = false;
		for (let item2 of oldFiles) {
			if (item1.ids.googleDrive === item2.ids.googleDrive) {
				itemFound = true;
			}
		}
		if (!itemFound) {
			console.log('ADD: ', item1);
		}
	}
};

const findDelete = (latestFiles: any, oldFiles: any) => {
	for (let item1 of oldFiles) {
		let itemFound = false;
		for (let item2 of latestFiles) {
			if (item1.ids.googleDrive === item2.ids.googleDrive) {
				itemFound = true;
			}
		}
		if (!itemFound) {
			console.log('DELETE: ', item1);
		}
	}
};

const findRename = (latestFiles: any, oldFiles: any) => {
	for (let item1 of oldFiles) {
		let renameFound = false;
		let newName = '';
		for (let item2 of latestFiles) {
			if (
				item1.ids.googleDrive === item2.ids.googleDrive &&
				item1.name != item2.name
			) {
				renameFound = true;
				newName = item2.name;
			}
		}
		if (renameFound) {
			console.log(`RENAME to ${newName}: `, item1);
		}
	}
};

const findUpdate = (latestFiles: any, oldFiles: any) => {
	for (let item1 of oldFiles) {
		let updateFound = false;
		for (let item2 of latestFiles) {
			if (
				item1.ids.googleDrive === item2.ids.googleDrive &&
				item1.lastModified != item2.lastModified
			) {
				updateFound = true;
			}
		}
		if (updateFound) {
			console.log(`UPDATE: `, item1);
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
		// comparator(currentStructure, cloudStructure);
		// upstream
	} else if (cloudDate > currentDate) {
		console.log('CLOUD Structure is more recent');
		comparator(cloudFiles, localFiles);
		// downstream
	}
};

export const detectStructureChanges = (cloudStructure: any) => {
	let localStructure = getNotebookStructure();

	scanAndCompare(localStructure, cloudStructure);

	console.log(changes);
};

// renaming
// deleted files
// new files
// modified files/size increase/decrease (content change)

// changes = {
//     localChanges: [ // downstream
//         {
//             action: 'ADD',
//             content: { parentIds: parentIds, item: newItem }
//         },
//         {
//             action: 'RENAME',
//             content: {item: renamedItem}
//         },
//         {
//             action: 'DELETE',
//             content: {item: deletedItem}
//         },
//         {
//             action: 'SAVE',
//             content: {item: savedItem}
//         }
//     ],
//     cloudChanges: [ // upstream
//         {
//             action: 'ADD',
//             content: { parentIds: parentIds, item: newItem }
//         },
//         {
//             action: 'RENAME',
//             content: {item: renamedItem}
//         },
//         {
//             action: 'DELETE',
//             content: {item: deletedItem}
//         },
//         {
//             action: 'SAVE',
//             content: {item: savedItem}
//         }
//     ]
// }
