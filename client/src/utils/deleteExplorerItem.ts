import fs from 'fs';

export const deleteExplorerItem = async (path: string | undefined) => {
	return new Promise<boolean>((resolve, _) => {
		if (!path) return;
		if (fs.statSync(path).isDirectory()) {
			fs.rmdir(path, { recursive: true }, (err) => {
				resolve(!err);
			});
		} else {
			fs.unlink(path, (err) => {
				resolve(!err);
			});
		}
	});
};
