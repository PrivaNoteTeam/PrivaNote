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
	if (onlyFiles && !path.endsWith('.md')) return path;

	if (onlyFiles && path.endsWith('/')) return path.slice(0, -1);

	let newPath = path;

	if (path.endsWith('/')) newPath = path.slice(0, -1);

	const i = newPath.lastIndexOf('/');

	return newPath.substring(0, i);
};
