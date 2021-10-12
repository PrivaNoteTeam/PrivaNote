import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { AppState, AppAction } from './types';
import { StoreProvider } from './hooks';
import { App } from './App';

const initialState: AppState = {};

const reducer = (state: AppState, action: AppAction) => {
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

const tree = (
	<StoreProvider initialState={initialState} reducer={reducer}>
		<App />
	</StoreProvider>
);

ReactDOM.render(tree, document.getElementById('app'));
