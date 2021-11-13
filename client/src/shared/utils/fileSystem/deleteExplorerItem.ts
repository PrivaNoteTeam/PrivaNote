import { ipcRenderer } from 'electron';
import fs from 'fs';
import p from 'path';

export const deleteExplorerItem = async (path: string | undefined) => {
	return new Promise<boolean>((resolve, _) => {
		if (!path) return;
		try {
			fs.rmSync(path, { recursive: true, force: true });

			// crossPath is temp fix until path is using path.sep
			let crossPath = path.replace(/\\/g, p.sep); // replaces all '\'
			crossPath = crossPath.replace(/\//g, p.sep); // replaces all '/'
			ipcRenderer.send('deleteExplorerItem', crossPath);
			resolve(true);
		} catch (error) {
			console.log(error);
			resolve(false);
		}
	});
};
