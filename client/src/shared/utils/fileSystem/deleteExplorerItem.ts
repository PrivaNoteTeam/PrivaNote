import fs from 'fs';
import { deleteItemFromStructure } from '../synchronization/deleteItemFromStructure';

// notebook should be mandatory, made it optional cause i didn't want to touch test file - J.X.
export const deleteExplorerItem = async (
	path: string | undefined,
	notebook: any = undefined
) => {
	return new Promise<boolean>((resolve, _) => {
		if (!path) return;
		try {
			fs.rmSync(path, { recursive: true, force: true });
			deleteItemFromStructure(path, notebook);
			resolve(true);
		} catch (error) {
			console.log(error);
			resolve(false);
		}
	});
};
