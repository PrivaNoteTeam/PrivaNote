import { Context } from '../types';
import argon2 from 'argon2';

export async function updateUserPassword(
	ctx: Context,
	userId: number,
	data: { newPassword: string }
): Promise<boolean> {
	try {
		const hashedPassword = await argon2.hash(data.newPassword);

		await ctx.prisma.user.update({
			data: {
				password: hashedPassword
			},
			where: {
				userID: userId
			}
		});

		return true;
	} catch (err) {
		return false;
	}
}
