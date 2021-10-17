
import React, {
	createContext,
	PropsWithChildren,
	useMemo,
	useContext,
	useReducer,
	Dispatch
} from 'react';
import { UserState, UserAction } from '@types';

interface UserContext {
	initialState: UserState;
	reducer: (state: UserState, action: UserAction) => UserState;
}

const context = createContext<any>({});

export const UserProvider = ({
	children,
	initialState = {},
	reducer
}: PropsWithChildren<UserContext>) => {
	const [store, dispatch] = useReducer(reducer, initialState);

	const contextValue = useMemo(() => [store, dispatch], [store, dispatch]);

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useUserStore = () =>
	useContext<[UserState, Dispatch<UserAction>]>(context);
