import React from 'react';
import { ipcRenderer } from 'electron';
import { Route, useHistory } from 'react-router';
import { CreateNotebookModal } from './CreateNotebookModal';
import { LoginModal } from './modalManager/LoginModal';
import { RegisterModal } from './modalManager/RegisterModal';
import { ResetPasswordModal } from './modalManager/ResetPasswordModal';
import { VerificiationModal } from './modalManager/VerificationModal';
import { TwoFactorAuthModal } from './modalManager/TwoFactorAuthModal';
import { ForgotPasswordModal } from './modalManager/ForgotPasswordModal';

export function ModalManager() {
	let history = useHistory();
	ipcRenderer.on('createNotebook', () => {
		history.push('/notebook/create');
	});

	return (
		<>
			<Route
				path='/notebook/create'
				children={<CreateNotebookModal />}
				exact
			/>
			<Route path='/login' children={<LoginModal />} exact />
			<Route path='/register' children={<RegisterModal />} exact />
			<Route
				path='/forgot-password'
				children={<ForgotPasswordModal />}
				exact
			/>
			<Route
				path='/reset-password'
				children={<ResetPasswordModal />}
				exact
			/>
			<Route
				path='/verification'
				children={<VerificiationModal />}
				exact
			/>
			<Route path='/2fa' children={<TwoFactorAuthModal />} exact />
		</>
	);
}
