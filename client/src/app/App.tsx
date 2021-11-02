import React from 'react';
import { EditorPanel } from '@components/EditorPanel';
import { useEffect } from 'react';
import { useStore, useUserStore, EditorProvider } from '@hooks';
import { EditorState, EditorAction } from '@types';
import { ModalManager } from '@components/ModalManager';
import { PageManager } from '@components/PageManager';
import { SideMenu } from '@components/SideMenu';
import { getUser } from '@shared/Api/getUser';
import { useIpcListeners } from './hooks/useIpcListeners';
// import { useGoogleDrive } from './hooks/useGoogleDrive';

export const editorReducer = (state: EditorState, action: EditorAction) => {
	switch (action.type) {
		case 'primarySelect':
			return { ...state, primarySelection: action.primarySelection };
		case 'secondarySelect':
			return { ...state, secondarySelection: action.secondarySelection };
		case 'rename':
			return { ...state, isRenaming: action.isRenaming };
	}
};

export function App() {
	const [{ currentNote, notebook }] = useStore();
	const [, userDispatch] = useUserStore();

	useIpcListeners();
	// useGoogleDrive();

	useEffect(() => {
		getUser().then(({ user }) => {
			if (user) userDispatch({ type: 'login', user });
		});
	}, [currentNote, notebook]);

	return (
		<>
			<div className='bg-gray-800 w-screen h-screen flex'>
				<SideMenu />
				<EditorProvider
					initialState={{ isRenaming: false }}
					reducer={editorReducer}
				>
					<EditorPanel />
				</EditorProvider>
				<PageManager />
				<ModalManager />
			</div>
		</>
	);
}
