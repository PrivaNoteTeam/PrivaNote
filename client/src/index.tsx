import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';

function App() {
	const [currentNotebook, _] = useState<string | undefined>();

	const [createNotebookModalVisible, setCreateNotebookModalVisible] =
		useState(false);

	ipcRenderer.on('createNotebook', () => {
		setCreateNotebookModalVisible(true);
	});

	return (
		<div className='bg-gray-800 w-screen h-screen'>
			<p className='text-white'>
				Current Notebook: {currentNotebook || 'None'}
			</p>
			{createNotebookModalVisible && (
				<CreateNotebookModal
					close={() => setCreateNotebookModalVisible(false)}
				/>
			)}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
