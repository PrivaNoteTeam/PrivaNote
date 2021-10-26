import { Dispatch } from 'react';
import { PayloadAction } from 'typesafe-actions';

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
				idToken?: string;
			}
	  >
	| PayloadAction<'REMOVE_PROVIDER', { providerName: string; path: string }>
>;

// Reducer Types
export interface AppState {
	notebook?: string;
	currentNote?: FileItem;
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
	isRenaming: boolean;
}

export interface EditorAction extends EditorState {
	type: 'primarySelect' | 'secondarySelect' | 'rename';
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
