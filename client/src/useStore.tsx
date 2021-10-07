import React, {
	createContext,
	PropsWithChildren,
	useMemo,
	useContext,
	useReducer,
	Dispatch
} from 'react';
import { AppState, AppAction } from './types';

interface StoreContext {
	initialState: AppState;
	reducer: (state: AppState, action: AppAction) => AppState;
}

const context = createContext<any>({});

export const StoreProvider = ({
	children,
	initialState = {},
	reducer
}: PropsWithChildren<StoreContext>) => {
	const [store, dispatch] = useReducer(reducer, initialState);

	const contextValue = useMemo(() => [store, dispatch], [store, dispatch]);

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useStore = () =>
	useContext<[AppState, Dispatch<AppAction>]>(context);
