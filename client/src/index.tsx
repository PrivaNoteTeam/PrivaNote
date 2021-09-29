import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';

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

	return (
		<div className='bg-gray-800 w-screen h-screen'>
			<p className='text-white'>
				Current Notebook: {currentNotebook || 'None'}
			</p>
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
