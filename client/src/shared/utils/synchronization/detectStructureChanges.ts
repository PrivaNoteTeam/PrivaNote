import { getNotebookStructure } from './getNotebookStructure';

export const detectStructureChanges = (otherStructure: any) => {
	let currentStructure = getNotebookStructure();
	let changes = [];
};
