import watch from 'node-watch';

export const watchDirectory = (path: string, cb: () => any) => {
	watch(path, { recursive: true }, cb);
};
