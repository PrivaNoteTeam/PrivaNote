import { Context, LoginData } from '../types';
import argon2 from 'argon2';

interface FieldError {
	field: string;
	message: string;
}

export async function loginFieldValidation({
	email,
	password
}: LoginData): Promise<FieldError | undefined> {
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
	const validEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
	if (!email.match(validEmail)) {
		return {
			field: 'email',
			message: 'invalid email'
		};
	}
	return;
}
