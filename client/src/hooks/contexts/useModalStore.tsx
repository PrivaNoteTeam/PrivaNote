import React, {
	createContext,
	PropsWithChildren,
	useMemo,
	useContext,
	useReducer,
	Dispatch
} from 'react';
import { ModalManagerState, ModalManagerAction } from '../../types';

interface ModalContext {
	initialState: ModalManagerState;
	reducer: (
		state: ModalManagerState,
		action: ModalManagerAction
	) => ModalManagerState;
}

const context = createContext<any>(undefined);

export const ModalProvider = ({
	children,
	initialState,
	reducer
}: PropsWithChildren<ModalContext>) => {
	const [store, dispatch] = useReducer(reducer, initialState);

	const contextValue = useMemo(() => {
		return [store, dispatch] as [
			ModalManagerState,
			Dispatch<ModalManagerAction>
		];
	}, [store, dispatch]);

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useModalStore = () =>
	useContext<[ModalManagerState, Dispatch<ModalManagerAction>]>(context);
