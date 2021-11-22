import { PrivaNoteConfig } from '@types';
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
import fs from 'fs';

const actions = {
	init: createAction('INIT')<string>(),
	load: createAction('LOAD')<string>(),
	addProvider: createAction('ADD_PROVIDER')<{
		providerName: string;
		path: string;
		accessToken?: string;
		refreshToken?: string;
		idToken?: string;
	}>(),
	removeProvider: createAction('REMOVE_PROVIDER')<{
		providerName: string;
		path: string;
	}>(),
	setSetting: createAction('SET_SETTING')<{
		configPath: string;
		settingName: keyof PrivaNoteConfig;
		value: any;
	}>()
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
			return getConfig(action.payload) as PrivaNoteConfig;
		case getType(actions.addProvider):
			if (
				state!['cloud.connectedProviders'].find((p) => {
					return p.name === action.payload.providerName;
				})
			) {
				return state;
			}

			const addProviderState = {
				...state,
				['cloud.connectedProviders']: [
					...state!['cloud.connectedProviders'],
					{
						name: action.payload.providerName,
						accessToken: action.payload.accessToken,
						refreshToken: action.payload.refreshToken,
						idToken: action.payload.idToken
					}
				]
			};

			fs.writeFileSync(
				action.payload.path + '/.privanote/app.json',
				JSON.stringify(addProviderState, null, 4)
			);

			return addProviderState as PrivaNoteConfig;
		case getType(actions.removeProvider):
			console.log('STATE:', state);
			if (!state || !state['cloud.connectedProviders']) return;
			if (
				!state!['cloud.connectedProviders'].find((p) => {
					return p.name === action.payload.providerName;
				})
			) {
				return state;
			}

			const removeProviderState = {
				...state,
				['cloud.connectedProviders']: state![
					'cloud.connectedProviders'
				].filter((p) => p.name !== action.payload.providerName)
			};

			fs.writeFileSync(
				action.payload.path + '/.privanote/app.json',
				JSON.stringify(removeProviderState, null, 4)
			);

			return removeProviderState as PrivaNoteConfig;
		case getType(actions.setSetting):
			if (!state) return;

			const updatedSettingState = {
				...state
			};

			(updatedSettingState[
				action.payload.settingName
			] as unknown as any) = action.payload.value;

			fs.writeFileSync(
				action.payload.configPath + '/.privanote/app.json',
				JSON.stringify(updatedSettingState, null, 4)
			);

			return { ...updatedSettingState };
		default:
			return defaultGuard(state, action as never);
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
