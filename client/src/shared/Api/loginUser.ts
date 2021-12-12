import { generateEncryptionKey } from '@shared/data/encryption';
import { LoginFormValues, FormError, FieldError } from '@types';
import axios from 'axios';
import { ipcRenderer } from 'electron';

interface LoginResponse {
	success?: boolean;
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
				try {
					const key = generateEncryptionKey(password);
					ipcRenderer.send('setEncryptionKey', key);
				} catch (err) {
					console.log(err);
				}
				resolve(response.data as LoginResponse);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
