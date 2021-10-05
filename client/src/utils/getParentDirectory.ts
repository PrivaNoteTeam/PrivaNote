interface Options {
	onlyFiles?: boolean;
}

const defaultOptions = {
	onlyFiles: false
};

/**
 * Gets the parent directory of the specified path
 * @param options.onlyFiles Setting this option to `true` will only get the parent directory for files and ignore directories.
 */

export const getParentDirectory = (
	path: string,
	{ onlyFiles }: Options = defaultOptions
) => {
	if (onlyFiles && (!path.endsWith('.md') || path.endsWith('/'))) return path;

	let newPath = path;

	if (path.endsWith('/')) newPath = path.slice(0, -1);

	const i = newPath.lastIndexOf('/');

	return newPath.substring(0, i);
};
