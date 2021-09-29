import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';

function App() {
	const [createNotebookModalVisible, setCreateNotebookModalVisible] =
		useState(false);

	ipcRenderer.on('createNotebook', () => {
		setCreateNotebookModalVisible(true);
	});

	return (
		<div>
			{createNotebookModalVisible && (
				<CreateNotebookModal
					close={() => setCreateNotebookModalVisible(false)}
				/>
			)}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
