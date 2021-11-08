import fs from 'fs';

/** Returns file size in kB */
export const getFileSize = (path: string) => {
	const fileStats = fs.statSync(path);
	return (fileStats.size / 1024).toFixed(2);
};
