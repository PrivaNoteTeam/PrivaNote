import chokidar from 'chokidar';

export const watchDirectory = (path: string, cb: () => any) => {
	chokidar.watch(path).on('all', cb);
};
