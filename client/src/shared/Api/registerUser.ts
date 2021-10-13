import { RegisterFormValues } from '@types';
import axios from 'axios';

export function registerUser({ email, password }: RegisterFormValues) {
	axios.post('http://localhost:8080/api/register', {
		email,
		password
	})
	.then((v) => {
		console.log('Received from server: ');
		console.log(v);
	})
	.catch((err) => {
		console.error(err);
	});
}
