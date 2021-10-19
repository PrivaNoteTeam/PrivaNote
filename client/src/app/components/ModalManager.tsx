import React from 'react';
import { LoginModal } from './modalManager/LoginModal';
import { RegisterModal } from './modalManager/RegisterModal';
import { CreateNotebookModal } from './CreateNotebookModal';
import { ipcRenderer } from 'electron';
import { useModalStore } from '../hooks';
import { VerificiationModal } from './modalManager/VerificationModal';
import { TwoFactorAuthModal } from './modalManager/TwoFactorAuthModal';
import { ForgotPasswordModal } from './modalManager/ForgotPasswordModal';
import { ResetPasswordModal } from './modalManager/ResetPasswordModal';

export function ModalManager() {
	const [
		{
			loginModalVisible,
			registerModalVisible,
			createNotebookModalVisible,
			verificationModalVisible,
			twoFactorAuthModalVisible,
			forgotPasswordModalVisible,
			resetPasswordModalVisible
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
	} else if (forgotPasswordModalVisible) {
		render = <ForgotPasswordModal />;
	} else if (resetPasswordModalVisible) {
		render = <ResetPasswordModal />;
	}

	return render;
}
