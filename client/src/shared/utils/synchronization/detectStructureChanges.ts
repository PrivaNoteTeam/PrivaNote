import { getNotebookStructure } from './getNotebookStructure';

export const detectStructureChanges = (otherStructure: any) => {
	let currentStructure = getNotebookStructure();
	let changes: any = [];

	console.log(changes);
	console.log(currentStructure);
	console.log(otherStructure);
};
