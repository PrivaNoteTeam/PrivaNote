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
import { useGoogleDrive } from './hooks/useGoogleDrive';
import { FileExplorer } from './components/FileExplorer';
import { Placeholder } from './components/Placeholder';
import { NotificationArea } from './components/NotificationArea';
import { SplitPane } from 'react-collapse-pane';

export const editorReducer = (state: EditorState, action: EditorAction) => {
	switch (action.type) {
		case 'primarySelect':
			return { ...state, primarySelection: action.primarySelection! };
		case 'secondarySelect':
			return { ...state, secondarySelection: action.secondarySelection! };
	}
};

export function App() {
	const [{ currentFile, notebook }] = useStore();
	const [, userDispatch] = useUserStore();

	useIpcListeners();
	useGoogleDrive();

	useEffect(() => {
		getUser().then(({ user }) => {
			if (user) userDispatch({ type: 'login', user });
		});
	}, [currentFile, notebook]);

	return (
		<>
			<div className='bg-gray-800 w-screen h-screen flex'>
				<SideMenu />
				<EditorProvider initialState={{}} reducer={editorReducer}>
					{notebook ? (
						<SplitPane
							split='vertical'
							className='w-full h-full'
							initialSizes={[1, 5]}
						>
							<FileExplorer />
							<EditorPanel />
						</SplitPane>
					) : (
						<div className='relative flex-grow flex flex-col'>
							<NotificationArea />
							<Placeholder text='Open a notebook to continue' />
						</div>
					)}
				</EditorProvider>
				<PageManager />
				<ModalManager />
			</div>
		</>
	);
}
