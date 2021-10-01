export const useRelativePath = (base: string, fullPath: string) =>
	fullPath.substr(base.length);
