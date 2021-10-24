import { PrivaNoteConfig, Provider } from '@types';
import { ActionType, getType, createAction } from 'typesafe-actions';
import { defaultConfig, getConfig } from '@shared/utils';
import { ConfigDispatch } from '@types';
import React, {
	useMemo,
	useReducer,
	useContext,
	createContext,
	PropsWithChildren
} from 'react';

const actions = {
	init: createAction('INIT')<string>(),
	load: createAction('LOAD')<string>(),
	addProvider: createAction('ADD_PROVIDER')<Provider>(),
	removeProvider: createAction('REMOVE_PROVIDER')<Provider>()
};

function defaultGuard<S>(state: S | undefined, _: never) {
	return state;
}

const reducer = (
	state: PrivaNoteConfig | undefined,
	action: ActionType<typeof actions>
) => {
	switch (action.type) {
		// init will be implemented when createNotebook is promoted into a reducer
		case getType(actions.init):
			//const notebookPath = action.payload;
			//fs.writeFileSync(
			//`${notebookPath}/.privanote/app.json`,
			//JSON.stringify(defaultConfig)
			//);

			return defaultConfig;
		case getType(actions.load):
			console.log('LOAD');
			console.log(action.payload);
			return getConfig(action.payload) as PrivaNoteConfig;
		case getType(actions.addProvider):
			if (state!.connectedProviders.includes(action.payload)) {
				return state;
			}

			return {
				...state,
				connectedProviders: [
					...state!.connectedProviders,
					action.payload
				]
			} as PrivaNoteConfig;
		case getType(actions.removeProvider):
			if (!state!.connectedProviders.includes(action.payload)) {
				return state;
			}

			return {
				...state,
				connectedProviders: state!.connectedProviders.filter(
					(p) => p !== action.payload
				)
			} as PrivaNoteConfig;
		default:
			return defaultGuard(state, action);
	}
};

const context = createContext<any>(undefined);

export const ConfigProvider = ({ children }: PropsWithChildren<{}>) => {
	const [config, dispatch] = useReducer(reducer, undefined);

	const contextValue = useMemo(() => {
		return [config, dispatch];
	}, [config, dispatch]);

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useConfig = () =>
	useContext<[PrivaNoteConfig | undefined, ConfigDispatch]>(context);
