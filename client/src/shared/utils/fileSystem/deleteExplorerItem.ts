import { ipcRenderer } from 'electron';
import fs from 'fs';

export const deleteExplorerItem = async (path: string | undefined) => {
	return new Promise<boolean>((resolve, _) => {
		if (!path) return;
		try {
			fs.rmSync(path, { recursive: true, force: true });
			ipcRenderer.send('deleteExplorerItem', path);
			resolve(true);
		} catch (error) {
			console.log(error);
			resolve(false);
		}
	});
};
