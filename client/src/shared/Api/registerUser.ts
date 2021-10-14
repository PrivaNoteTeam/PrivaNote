import { RegisterFormValues, User } from '@types';
import axios from 'axios';

interface FormError {
	message: string;
}
interface FieldError extends FormError {
	field: string;
}

interface RegisterResponse {
	user?: User,
	fieldError?: FieldError,
	formError?: FormError
} 
export async function registerUser({ email, password }: RegisterFormValues) {
	return new Promise<RegisterResponse>((resolve, reject) => {
		axios.post('http://localhost:8080/api/register', {
			email,
			password
		})
		.then((response) => {
			console.log(response.data);
			
			resolve(response.data as RegisterResponse)
		})
		.catch((err) => {
			console.error(err);
			reject(err);
		});
		
	});
}