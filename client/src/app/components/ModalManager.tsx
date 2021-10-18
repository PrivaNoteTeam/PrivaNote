import React from 'react';
import { LoginModal } from './modalManager/LoginModal';
import { RegisterModal } from './modalManager/RegisterModal';
import { CreateNotebookModal } from './CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { useModalStore } from '../hooks';
import { VerificiationModal } from './modalManager/VerificationModal';
import { TwoFactorAuthModal } from './modalManager/TwoFactorAuthModal';

export function ModalManager() {
	const [
		{
			loginModalVisible,
			registerModalVisible,
			createNotebookModalVisible,
			verificationModalVisible,
			twoFactorAuthModalVisible
		},
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
	} else if (verificationModalVisible) {
		render = <VerificiationModal />;
	} else if (twoFactorAuthModalVisible) {
		render = <TwoFactorAuthModal />;
	}

	return render;
}
