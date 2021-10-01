import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { EditorPanel } from './components/EditorPanel';

function App() {
	const [currentNotebook, setCurrentNotebook] = useState<
		string | undefined
	>();

	const [createNotebookModalVisible, setCreateNotebookModalVisible] =
		useState(false);

	useEffect(() => {
		ipcRenderer.on('createNotebook', () => {
			setCreateNotebookModalVisible(true);
		});

		ipcRenderer.on('openNotebook', (_, location: string | undefined) => {
			if (location) setCurrentNotebook(location);
		});
	}, []);

	console.log(currentNotebook + ' in index.tsx');

	return (
		<div className='bg-gray-800 w-screen h-screen flex'>
			<div className='bg-gray-700 py-1 px-4'>
				<p>Menu</p>
			</div>
			<EditorPanel currentNotebook={currentNotebook} />
			{createNotebookModalVisible && (
				<CreateNotebookModal
					setCurrentNotebook={setCurrentNotebook}
					close={() => setCreateNotebookModalVisible(false)}
				/>
			)}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
