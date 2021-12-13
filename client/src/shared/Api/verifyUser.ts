import { User, VerificationFormValues } from '@types';
import axios from 'axios';

interface FormError {
	message: string;
}
interface FieldError extends FormError {
	field: string;
}

interface VerificationResponse {
	message?: string;
	fieldError?: FieldError;
	formError?: FormError;
	user?: User;
}

export async function verifyUser({ verificationCode }: VerificationFormValues) {
	return new Promise<VerificationResponse>((resolve, reject) => {
		axios
			.post('https://privanote.herokuapp.com/api/verify', {
				verificationCode
			})

			.then((response) => {
				resolve(response.data as VerificationResponse);
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
}
