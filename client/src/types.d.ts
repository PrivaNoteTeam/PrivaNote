export interface FileSystemItem {
	name: string;
	path: string;
	type: 'note' | 'directory';
}

export type FileItem = Omit<FileSystemItem, 'type'>;

export interface PrivaNoteConfig {
	autoSave: boolean;
	spellCheck: boolean;
	dictionaryLanguage: string;
	fontFamily: string;
	fontSize: number;
	tabWidth: number;
	columns: number;
}
