export const getFileName = (path: string) => {
	const parts = path.split(/[\/\\]/);

	if (parts.length != 0) return parts[parts.length - 1];

	console.warn('Possible invalid filename or path: ' + path);

	return path;
};
