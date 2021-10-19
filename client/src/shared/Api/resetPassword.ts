import axios from 'axios';
import { FieldError, resetPasswordFormValues } from '@types';

interface resetPasswordResponse {
	success?: boolean;
	fieldError?: FieldError;
}

export async function resetPassword({ password }: resetPasswordFormValues) {
	return new Promise<resetPasswordResponse>((resolve, reject) => {
		axios

			.post('http://localhost:8080/api/forgot-password', { password })
			.then((response) => {
				resolve(response.data as resetPasswordResponse);
			})

			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
}
