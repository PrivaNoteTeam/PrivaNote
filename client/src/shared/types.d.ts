import { Dispatch } from 'react';
import { PayloadAction } from 'typesafe-actions';

export type FileSystemItemType = 'note' | 'directory' | 'attachment';

export interface FileSystemItem {
	name: string;
	path: string;
	type: FileSystemItemType;
}

export type FileItem = Omit<FileSystemItem, 'type'>;

export type cloudIds = {
	privaNote?: string;
	googleDrive?: string;
	oneDrive?: string;
};

export type NotebookItem = {
	id: string;
	cloudIds: cloudIds;
	name: string;
	mimeType: string;
	paths: string[];
	dateCreated: Date;
	lastModified: Date | string;
	content?: any;
};
export type NotebookStructure = NotebookItem[];

export type SyncType = 'ADD' | 'DELETE' | 'RENAME' | 'UPDATE';
export type SyncContent = {
	parent?: NotebookItem;
	renamedTarget?: NotebookItem;
	item: NotebookItem;
};

export type SyncAction = {
	action: SyncType;
	content: SyncContent;
};

export type SyncResponse = {
	type: 'LOCAL' | 'CLOUD';
	changes: SyncAction[];
};

export interface PrivaNoteConfig {
	autoSave: boolean;
	spellCheck: boolean;
	dictionaryLanguage: string;
	fontFamily: string;
	fontSize: number;
	tabWidth: number;
	columns: number;
	connectedProviders: Provider[];
}

export type Provider = {
	name: string;
	accessToken?: string;
	idToken?: string;
};

// New Refactored Reducer Types
export type Action<K, V = void> = V extends void
	? { type: K }
	: { type: K } & V;

type ConfigDispatch = Dispatch<
	| PayloadAction<'INIT', string>
	| PayloadAction<'LOAD', string>
	| PayloadAction<
			'ADD_PROVIDER',
			{
				providerName: string;
				path: string;
				accessToken?: string;
				refreshToken?: string;
				idToken?: string;
			}
	  >
	| PayloadAction<'REMOVE_PROVIDER', { providerName: string; path: string }>
>;

// Reducer Types
export interface AppState {
	notebook?: string;
	currentFile?: FileItem;
}

export interface AppAction extends AppState {
	type: 'openNotebook' | 'openNote';
}

export interface UserState {
	user?: User;
}

export interface UserAction extends UserState {
	type: 'login' | 'logout';
}

export interface EditorState {
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
}

export interface EditorAction extends Partial<EditorState> {
	type: 'primarySelect' | 'secondarySelect';
}

export interface RegisterFormValues {
	email: string;
	password: string;
	confirmPassword: string;
}

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface ForgotPasswordFormValues {
	email: string;
}

export interface ResetPasswordFormValues {
	password: string;
}

export interface VerificationFormValues {
	verificationCode: string;
}

export interface FormError {
	message: string;
}

export interface User {
	userID: number;
	firstName: string | null;
	lastName: string | null;
	email: string;
	verified: boolean;
}

export interface FormError {
	message: string;
}

export interface FieldError extends FormError {
	field: string;
}

export interface Notification {
	message: string;
	style: 'success' | 'neutral' | 'error';
}

export type NotificationState = Notification[];
