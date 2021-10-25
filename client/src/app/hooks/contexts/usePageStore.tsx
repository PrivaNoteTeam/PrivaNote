import React, {
	createContext,
	PropsWithChildren,
	useMemo,
	useContext,
	useReducer,
	Dispatch
} from 'react';
import { PageManagerState, PageManagerAction } from '@types';

const initialState: PageManagerState = {
	cloudProviderPageVisible: false,
	selectCloudProviderPageVisible: false
};

const reducer = (
	state: PageManagerState,
	action: PageManagerAction
): PageManagerState => {
	switch (action.type) {
		case 'cloudProviderPage':
			if (action.cloudProviderPageVisible === undefined) break;

			return {
				...initialState,
				cloudProviderPageVisible: action.cloudProviderPageVisible
			};
		case 'selectCloudProviderPage':
			if (action.selectCloudProviderPageVisible === undefined) break;

			return {
				...initialState,
				selectCloudProviderPageVisible:
					action.selectCloudProviderPageVisible
			};
		default:
			break;
	}

	console.error('Invalid action given');

	return state;
};

const context = createContext<any>(undefined);

export const PageProvider = ({ children }: PropsWithChildren<{}>) => {
	const [store, dispatch] = useReducer(reducer, initialState);

	const contextValue = useMemo(() => {
		return [store, dispatch] as [
			PageManagerState,
			Dispatch<PageManagerAction>
		];
	}, [store, dispatch]);

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const usePageStore = () =>
	useContext<[PageManagerState, Dispatch<PageManagerAction>]>(context);
