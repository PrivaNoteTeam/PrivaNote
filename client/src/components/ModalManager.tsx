import React from 'react';
import { LoginModal } from './modalManager/LoginModal';
import { RegisterModal } from './modalManager/RegisterModal';
import { CreateNotebookModal } from './CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { useModalStore } from '../hooks';

export function ModalManager() {
	const [
		{ loginModalVisible, registerModalVisible, createNotebookModalVisible },
		modalManagerDispatch
	] = useModalStore();

	ipcRenderer.on('createNotebook', () => {
		modalManagerDispatch({
			type: 'createNotebookModal',
			createNotebookModalVisible: true
		});
	});

	let render: JSX.Element | null = null;

	if (loginModalVisible) {
		render = <LoginModal />;
	} else if (registerModalVisible) {
		render = <RegisterModal />;
	} else if (createNotebookModalVisible) {
		render = <CreateNotebookModal />;
	}

	return render;
}
