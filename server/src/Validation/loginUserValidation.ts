import { Context, LoginData } from '../types';
import argon2 from 'argon2';

interface FieldError {
	field: string;
	message: string;
}

export async function loginValidation(
	{ prisma }: Context,
	{ email, password }: LoginData
): Promise<FieldError | undefined> {
	if (!email) {
		return {
			field: 'email',
			message: 'email is required'
		};
	}

	if (!password) {
		return {
			field: 'password',
			message: 'password is required'
		};
	}

	if (password.length < 8) {
		return {
			field: 'password',
			message: 'password must be 8 characters'
		};
	}

	const specialCharacters = /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/;
	if (!password.match(specialCharacters)) {
		return {
			field: 'password',
			message: 'password must contain a special character'
		};
	}

	const validEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
	if (!email.match(validEmail)) {
		return {
			field: 'email',
			message: 'invalid email'
		};
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			email
		}
	});
	if (!existingUser) {
		return {
			field: '',
			message: 'Please ensure your amail and password is correct'
		};
	}
	if (existingUser) {
		const passwordHashed = await argon2.hash(password);

		const passwordMatch = await argon2.verify(passwordHashed, password);
		if (passwordMatch) {
			console.log('Successed Login');
		} else {
			console.log('Failed Login');
		}
	}

	return;
}
