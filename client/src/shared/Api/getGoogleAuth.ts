import axios from 'axios';
import { shell } from 'electron';

export async function getGoogleAuth() {
	// const authUrl = getAuthUrl();
	return new Promise((resolve, reject) => {
		axios
			.get('http://localhost:8080/api/google-drive/get-auth-url')
			// .get(authUrl)
			.then((response) => {
				shell.openExternal(response.data as string);
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
