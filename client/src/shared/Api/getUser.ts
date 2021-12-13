import axios from 'axios';
import { User } from '@types';

interface UserResponse {
	user?: User;
	message?: string;
}

export async function getUser() {
	return new Promise<UserResponse>((resolve, reject) => {
		axios
			.get('https://privanote.herokuapp.com/api/user')
			.then((response) => {
				resolve(response.data as UserResponse);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}
