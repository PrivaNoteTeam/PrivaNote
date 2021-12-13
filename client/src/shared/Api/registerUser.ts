import { RegisterFormValues, FormError, FieldError } from '@types';
import axios from 'axios';

interface RegisterResponse {
	success?: boolean;
	fieldError?: FieldError;
	formError?: FormError;
}
export async function registerUser({ email, password }: RegisterFormValues) {
	return new Promise<RegisterResponse>((resolve, reject) => {
		axios
			.post('https://privanote.herokuapp.com/api/register', {
				email,
				password
			})
			.then((response) => {
				console.log(response.data);

				resolve(response.data as RegisterResponse);
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
}
