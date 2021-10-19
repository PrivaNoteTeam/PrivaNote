import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';
import {
	AppState,
	AppAction,
	ModalManagerState,
	ModalManagerAction,
	UserState,
	UserAction
} from '@types';
import { StoreProvider, ModalProvider, UserProvider } from './hooks/contexts';
import { App } from './App';

const initialAppState: AppState = {};

const storeReducer = (state: AppState, action: AppAction) => {
	switch (action.type) {
		case 'openNotebook':
			return {
				...state,
				notebook: action.notebook
			};
		case 'openNote':
			return {
				...state,
				currentNote: action.currentNote
			};
		default:
			throw new Error('An unknown action has been sent to the store.');
	}
};

const initialUserState: UserState = {};

const userReducer = (_: UserState, action: UserAction) => {
	switch (action.type) {
		case 'login':
			return {
				user: action.user
			};
		case 'logout':
			return {
				user: undefined
			};
	}
};

const initialModalState: ModalManagerState = {
	createNotebookModalVisible: false,
	loginModalVisible: false,
	registerModalVisible: false,
	verificationModalVisible: false,
	twoFactorAuthModalVisible: false,
	resetPasswordModalVisible: false,
	forgotPasswordModalVisible: false
};

// This reducer resets the state every time so no modal gets stacked
function modalReducer(
	state: ModalManagerState,
	action: ModalManagerAction
): ModalManagerState {
	switch (action.type) {
		case 'loginModal':
			return {
				...initialModalState,
				loginModalVisible: action.loginModalVisible!
			};
		case 'registerModal':
			return {
				...initialModalState,
				registerModalVisible: action.registerModalVisible!
			};
		case 'createNotebookModal':
			return {
				...initialModalState,
				createNotebookModalVisible: action.createNotebookModalVisible!
			};
		case 'verificationModal':
			return {
				...initialModalState,
				verificationModalVisible: action.verificationModalVisible!
			};
		case 'twoFactorAuthModal':
			return {
				...initialModalState,
				twoFactorAuthModalVisible: action.twoFactorAuthModalVisible!
			};
		case 'forgotPasswordModal':
			return {
				...initialModalState,
				forgotPasswordModalVisible: action.forgotPasswordModalVisible!
			};
		case 'resetPasswordModal':
			return {
				...initialModalState,
				resetPasswordModalVisible: action.resetPasswordModalVisible!
			}	
		default:
			console.error('Invalid action provided to modal manager reducer.');
			return state;
	}
}

const tree = (
	<StoreProvider initialState={initialAppState} reducer={storeReducer}>
		<UserProvider initialState={initialUserState} reducer={userReducer}>
			<ModalProvider
				initialState={initialModalState}
				reducer={modalReducer}
			>
				<App />
			</ModalProvider>
		</UserProvider>
	</StoreProvider>
);

ReactDOM.render(tree, document.getElementById('app'));
