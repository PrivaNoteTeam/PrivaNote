/** Returns path which is relative to `base`
 * 	@param base The absolute path of the reference point (ex. Notebook)
 * 	@param fullPath The absolute path of the file system item
 */

export const useRelativePath = (base: string, fullPath: string) => {
	if (base === '' || fullPath === '') {
		return () => {
			throw new Error('base or fullPath is empty');
		};
	}

	base = base.slice(-1) === '/' ? base.substr(0, base.length - 1) : base;
	base = base.split('/').pop()!;

	return fullPath.substr(fullPath.indexOf(base));
};
