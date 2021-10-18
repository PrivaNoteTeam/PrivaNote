import React from 'react';
import { ipcRenderer } from 'electron';
import { EditorPanel } from './components/EditorPanel';
import { getFileName } from '../shared/utils';
import { useEffect } from 'react';
import { useStore, useUserStore } from './hooks';
import { EditorProvider } from './hooks/contexts/useEditorStore';
import { EditorState, EditorAction } from '../shared/types';
import { ModalManager } from './components/ModalManager';
import { SideMenu } from './components/SideMenu';
import { getUser } from '@shared/Api/getUser';

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
	const [{ currentNote }, dispatch] = useStore();
	const [, userDispatch] = useUserStore();
	useEffect(() => {
		ipcRenderer.removeAllListeners('createNotebook');

		ipcRenderer.removeAllListeners('openNotebook');
		ipcRenderer.on(
			'openNotebook',
			(_, location: string, valid: boolean) => {
				if (!valid) {
					alert(
						`"${getFileName(location)}" is not a valid notebook.`
					);

					return;
				}

				dispatch({
					type: 'openNote',
					currentNote: undefined
				});

				dispatch({
					type: 'openNotebook',
					notebook: location
				});
			}
		);

		ipcRenderer.removeAllListeners('exportNote');
		ipcRenderer.on('exportNote', () => {
			ipcRenderer.send('currentFileToExport', currentNote);
		});
		
		getUser().then(({ user }) => {
			if (user)
				userDispatch({ type: 'login', user })
		});
		// Log in user automatically
		
	}, [currentNote]);

	return (
		<div className='bg-gray-800 w-screen h-screen flex'>
			<SideMenu />
			<EditorProvider
				initialState={{ isRenaming: false }}
				reducer={editorReducer}
			>
				<EditorPanel />
			</EditorProvider>
			<ModalManager />
		</div>
	);
}
