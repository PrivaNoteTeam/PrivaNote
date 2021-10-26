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
			<Route path='/notebook/create' component={CreateNotebookModal} />
			<Route path='/login' component={LoginModal} />
			<Route path='/register' component={RegisterModal} />
			<Route path='/forgot-password' component={ForgotPasswordModal} />
			<Route path='/reset-password' component={ResetPasswordModal} />
			<Route path='/verification' component={VerificiationModal} />
			<Route path='/2fa' component={TwoFactorAuthModal} />
		</>
	);
}
