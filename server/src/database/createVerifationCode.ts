import { Context, User } from '../types';

export async function createVerificationCode(
	ctx: Context,
	code: string,
	user: User
) {
	let expiresAt = new Date(Date.now());
	expiresAt.setHours(expiresAt.getHours() + 2);

	try {
		const verificationCode = ctx.prisma.oneTimeVerificationCode.create({
			data: {
				User: {
					connect: {
						userID: user.userID
					}
				},
				code,
				expiresAt
			}
		});

		return verificationCode;
	} catch (err) {
		console.error(err);
		return;
	}
}
