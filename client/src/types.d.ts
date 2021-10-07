import { Dispatch } from 'react';

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

// Reducer Types

export interface AppState {
	notebook?: string;
	currentNote?: FileItem;
}

export interface AppAction extends AppState {
	type: 'openNotebook' | 'openNote';
}

export interface EditorState {
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
}

export interface EditorAction extends EditorState {
	type: 'primarySelect' | 'secondarySelect' | 'rename';
}
