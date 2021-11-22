import axios from 'axios';
import { ipcRenderer } from 'electron';

interface DefaultHTTPResponse {
	message: string;
}

export async function logoutUser() {
	return new Promise<DefaultHTTPResponse>((resolve, reject) => {
		axios
			.post('http://localhost:8080/api/logout')
			.then((response) => {
				ipcRenderer.send('removeEncryptionKey');
				resolve(response.data as DefaultHTTPResponse);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}
