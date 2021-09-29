import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles.css';

import { CreateNotebookModal } from './components/CreateNotebookModal';

function App() {
	return (
		<div>
			<CreateNotebookModal />
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));
