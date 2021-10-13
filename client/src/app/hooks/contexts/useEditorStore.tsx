import React, {
	createContext,
	PropsWithChildren,
	useMemo,
	useContext,
	useReducer,
	Dispatch
} from 'react';
import { EditorState, EditorAction } from '@types';

interface EditorContext {
	initialState: EditorState;
	reducer: (state: EditorState, action: EditorAction) => EditorState;
}

const context = createContext<any>(undefined);

export const EditorProvider = ({
	children,
	initialState,
	reducer
}: PropsWithChildren<EditorContext>) => {
	const [store, dispatch] = useReducer(reducer, initialState);

	const contextValue = useMemo(() => {
		return [store, dispatch] as [EditorState, Dispatch<EditorAction>];
	}, [store, dispatch]);

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useEditorStore = () =>
	useContext<[EditorState, Dispatch<EditorAction>]>(context);
