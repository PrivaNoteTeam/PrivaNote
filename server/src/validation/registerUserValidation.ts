import { Context, RegisterData } from '../types';

interface FieldError {
	field: string;
	message: string;
}

export async function registerValidation(
	{ prisma }: Context,
	{ email }: RegisterData
): Promise<FieldError | undefined> {
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
