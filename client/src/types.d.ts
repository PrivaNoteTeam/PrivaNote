export interface FileSystemItem {
	name: string;
	path: string;
	type: 'note' | 'directory';
}

export type FileItem = Omit<FileSystemItem, 'type'>;
