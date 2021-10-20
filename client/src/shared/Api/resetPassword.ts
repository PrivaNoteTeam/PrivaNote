import axios from 'axios';
import { ResetPasswordFormValues } from '@types';

interface ResetPasswordResponse {
	success?: boolean;
}

export async function resetPassword({ password }: ResetPasswordFormValues) {
	return new Promise<ResetPasswordResponse>((resolve, reject) => {
		axios
			.post('http://localhost:8080/api/reset-password', { password })
			.then((response) => {
				resolve(response.data as ResetPasswordResponse);
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
}
