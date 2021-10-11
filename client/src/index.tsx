import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { EditorPanel } from './components/EditorPanel';
import { getFileName } from './utils/getFileName';
import { FileItem } from './types';

// For Login and Authentication
import LoginForm from "./components/Authentication/LoginForm"
import LoginButton from './components/Authentication/LoginButton';
import { login } from './utils/login';

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
			<div className='bg-gray-700 py-1 px-4'>
				<p>Menu</p>

				<LoginButton authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible}/>

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
			{authModalVisible && <LoginForm close={() => setAuthModalVisible(false) }Login={login} error={''}  />}

		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
