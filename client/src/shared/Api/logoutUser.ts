import axios from 'axios';

interface DefaultHTTPResponse {
	message: string;
}

export async function logoutUser() {
	return new Promise<DefaultHTTPResponse>((resolve, reject) => {
		axios
			.post('http://localhost:8080/api/logout')
			.then((response) => {
				resolve(response.data as DefaultHTTPResponse);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}
