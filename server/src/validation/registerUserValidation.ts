import { Context, RegisterData } from '../types';

interface FieldError {
	field: string;
	message: string;
}

export async function registerValidation(
	{ prisma }: Context,
	{ email, password }: RegisterData
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

	if (existingUser)
		return {
			field: 'email',
			message: 'already taken'
		};

	return;
}
