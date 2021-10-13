import { RegisterFormValues } from '@types';
import axios from 'axios';

export function registerUser({ email, password }: RegisterFormValues) {
	console.log(email + password);
	// axios

	axios.post('/register', {
		email,
		password
	});
}
