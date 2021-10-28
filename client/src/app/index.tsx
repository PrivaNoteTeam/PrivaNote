import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';
import { AppState, AppAction, UserState, UserAction } from '@types';
import {
	StoreProvider,
	UserProvider,
	ConfigProvider,
	NotificationProvider
} from '@hooks';
import { HashRouter } from 'react-router-dom';
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
				currentNote: action.currentFile
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

const tree = (
	<HashRouter>
		<StoreProvider initialState={initialAppState} reducer={storeReducer}>
			<UserProvider initialState={initialUserState} reducer={userReducer}>
				<NotificationProvider>
					<ConfigProvider>
						<App />
					</ConfigProvider>
				</NotificationProvider>
			</UserProvider>
		</StoreProvider>
	</HashRouter>
);

ReactDOM.render(tree, document.getElementById('app'));
