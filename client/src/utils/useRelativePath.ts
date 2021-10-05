/** Returns path which is relative to `base`
 * 	@param base The absolute path of the reference point (ex. Notebook)
 * 	@param fullPath The absolute path of the file system item
 */

export const useRelativePath = (base: string, fullPath: string) =>
	fullPath.substr(base.length);
