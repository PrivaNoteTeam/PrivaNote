import { Context, LoginData, User } from '../types';
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

export async function loginAccountValidation(
	ctx: Context,

	{ email, password }: LoginData
): Promise<User | undefined> {
	try {
		const user: any | null = await ctx.prisma.user.findFirst({
			where: { email }
		});

		if (user) {
			if (await argon2.verify(user.password, password)) {
				// Password matches
				const { password: _, ...userWithoutPassword } =
					user as unknown as any;

				return userWithoutPassword as User;
			}
		}
		return;
	} catch (err) {
		console.log(err);

		return;
	}
}
