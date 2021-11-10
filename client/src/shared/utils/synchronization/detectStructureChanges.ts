import { getNotebookStructure } from './getNotebookStructure';

let changes: any = [];

const retrieveStructureDate = (structure: any) => {
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

// 1. check if new files are added
// 2. check if files have been deleted

// const comparator = (baseStructure: any, compareStructure: any) => {
const comparator = (baseStructure: any, compareStructure: any) => {
	let item = {
		ids: baseStructure.ids,
		name: baseStructure.name,
		mimeType: baseStructure.mimeType,
		absolutePath: baseStructure.absolutePath,
		size: baseStructure.size,
		dateCreated: baseStructure.dateCreated,
		lastModified: baseStructure.lastModified,
		statusModified: baseStructure.statusModified
	};

	if (baseStructure.subFolder.length != compareStructure.subFolder.length) {
		// item has been either deleted or added
	} else {
		// loop and check that each item is exactly the same
		// if each item is not the same, the an item has
		// been deleted and a new one has been created
	}

	console.log(item);
	if (item.mimeType === 'Notebook' || item.mimeType === 'Folder') {
		for (let file of baseStructure.subFolder) {
			console.log(file);
			// comparator(file);
		}
	}
};

const scanAndCompare = (currentStructure: any, cloudStructure: any) => {
	let currentDate = new Date(retrieveStructureDate(currentStructure));
	let cloudDate = new Date(retrieveStructureDate(cloudStructure));
	if (currentDate > cloudDate) {
		// comparator(currentStructure, cloudStructure);
		// upstream
	} else if (cloudDate > currentDate) {
		// comparator(cloudStructure, currentStructure);
		// downstream
	}
	comparator(currentStructure, cloudStructure);
};

export const detectStructureChanges = (cloudStructure: any) => {
	let currentStructure = getNotebookStructure();

	scanAndCompare(currentStructure, cloudStructure);

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
