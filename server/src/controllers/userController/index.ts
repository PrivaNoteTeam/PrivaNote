import { verify } from './verify';
import { login } from './login';
import { register } from './register';
import { user } from './user';
import { logout } from './logout';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';

export const userController = {
	user,
	login,
	register,
	logout,
	verify,
	forgotPassword,
	resetPassword
};
