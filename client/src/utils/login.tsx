import { useState } from 'react';

interface LoginDetails {
	email: string;
	password: string;
}

// where we gonna check our admin
const TempUser = {
	email: 'admin@gmail.com',
	password: 'admin123'
};

export const login = (details: LoginDetails) => {
	const [, SetUser] = useState({ password: '', email: '' });

	console.log(details);

	if (
		details.email == TempUser.email &&
		details.password == TempUser.password
	) {
		console.log('logged in');
		SetUser({
			email: details.email,
			password: details.password
		});
	} else {
		console.log('Details do not match');
	}
};
