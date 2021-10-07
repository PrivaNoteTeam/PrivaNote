import React from 'react';
import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { EditorPanel } from './components/EditorPanel';
import { getFileName } from './utils';
import { useEffect, useState } from 'react';
import { useStore } from './useStore';

export function App() {
	const [{ currentNote }, dispatch] = useStore();
	const [createNotebookModalVisible, setCreateNotebookModalVisible] =
		useState(false);

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
	}, [currentNote]);

	return (
		<div className='bg-gray-800 w-screen h-screen flex'>
			<div className='bg-gray-700 py-1 px-4'>
				<p>Menu</p>
			</div>
			<EditorPanel />
			{createNotebookModalVisible && (
				<CreateNotebookModal
					close={() => setCreateNotebookModalVisible(false)}
				/>
			)}
		</div>
	);
}
