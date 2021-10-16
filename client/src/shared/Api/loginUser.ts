import { LoginFormValues, User, FormError, FieldError } from '@types';
import axios from 'axios';

interface LoginResponse {
	user?: User;
	fieldError?: FieldError;
	formError?: FormError;
}

export async function loginUser({ email, password }: LoginFormValues) {
	return new Promise<LoginResponse>((resolve, reject) => {
		axios
			.post('http://localhost:8080/api/login', {
				email,
				password
			})
			.then((response) => {
				console.log(response.data);
				resolve(response.data as LoginResponse);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}
