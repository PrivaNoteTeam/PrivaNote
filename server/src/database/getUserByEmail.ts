import { Context, User } from '../types';

export async function getUserByEmail(
	ctx: Context,
	email: string
): Promise<User | undefined> {
	try {
		const user = await ctx.prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) return;

		return user;
	} catch (_) {
		return;
	}
}
