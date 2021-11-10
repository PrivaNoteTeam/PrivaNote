import { getNotebookStructure } from './getNotebookStructure';

let changes: any = [];

const scanAndCompare = (currentStructure: any, otherStructure: any) => {
	console.log(currentStructure);
	console.log(otherStructure);
};

export const detectStructureChanges = (otherStructure: any) => {
	let currentStructure = getNotebookStructure();

	scanAndCompare(currentStructure, otherStructure);

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
