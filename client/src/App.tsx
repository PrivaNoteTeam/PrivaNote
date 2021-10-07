import React from 'react';
import { CreateNotebookModal } from './components/CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { EditorPanel } from './components/EditorPanel';
import { getFileName } from './utils/getFileName';
import { useEffect, useState } from 'react';
import { FileItem } from './types';
import { useStore } from './useStore';

export function App() {
	const [, dispatch] = useStore();
	const [currentFile, setCurrentFile] = useState<FileItem | undefined>();
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

				setCurrentFile(undefined);
				dispatch({
					type: 'openNotebook',
					notebook: location
				});
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
			</div>
			<EditorPanel
				currentFile={currentFile}
				setCurrentFile={setCurrentFile}
			/>
			{createNotebookModalVisible && (
				<CreateNotebookModal
					setCurrentFile={setCurrentFile}
					close={() => setCreateNotebookModalVisible(false)}
				/>
			)}
		</div>
	);
}
