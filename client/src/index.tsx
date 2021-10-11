import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { EditorPanel } from './components/EditorPanel';
import { getFileName } from './utils/getFileName';
import { FileItem } from './types';

import { LoginModal } from './components/LoginModal';
import { UserButton } from './components/loginModal/UserButton';

function App() {
	const [currentNotebook, setCurrentNotebook] = useState<
		string | undefined
	>();
	const [currentFile, setCurrentFile] = useState<FileItem | undefined>();

	const [createNotebookModalVisible, setCreateNotebookModalVisible] =
		useState(false);

	const [authModalVisible, setAuthModalVisible] = useState(false);

	useEffect(() => {
		ipcRenderer.removeAllListeners('createNotebook');
		ipcRenderer.on('createNotebook', () => {
			setCreateNotebookModalVisible(true);
		});

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

				setCurrentFile(undefined);
				setCurrentNotebook(location);
			}
		);

		ipcRenderer.removeAllListeners('exportNote');
		ipcRenderer.on('exportNote', () => {
			ipcRenderer.send('currentFileToExport', currentFile);
		});
	}, [currentFile]);

	return (
		<div className='bg-gray-800 w-screen h-screen flex'>
			<div className='flex flex-col-reverse bg-gray-700 py-4 px-4'>
				<UserButton
					authModalVisible={authModalVisible}
					setAuthModalVisible={setAuthModalVisible}
				/>
			</div>
			<EditorPanel
				currentNotebook={currentNotebook}
				currentFile={currentFile}
				setCurrentFile={setCurrentFile}
			/>
			{createNotebookModalVisible && (
				<CreateNotebookModal
					setCurrentNotebook={setCurrentNotebook}
					setCurrentFile={setCurrentFile}
					close={() => setCreateNotebookModalVisible(false)}
				/>
			)}
			{authModalVisible && (
				<LoginModal close={() => setAuthModalVisible(false)} error='' />
			)}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
