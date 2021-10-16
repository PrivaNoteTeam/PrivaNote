import { Context, CreateUserData, User } from '../types';

export async function createUser(
	ctx: Context,
	data: CreateUserData
): Promise<User | undefined> {
	try {
		const user: User = await ctx.prisma.user.create({
			data: {
				email: data.email,
				password: data.password,
				verified: false
			}
		});

		const { password: _, ...userWithoutPassword } = user as unknown as any;

		return userWithoutPassword as User;
	} catch (err) {
		console.error(err);
		return;
	}
}
