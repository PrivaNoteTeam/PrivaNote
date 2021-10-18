import { Context } from '../types';
import { OneTimeVerificationCode } from '.prisma/client';

export async function retrieveVerificationCode(
	ctx: Context,
	code: string
): Promise<OneTimeVerificationCode | null> {
	const verificationCode: OneTimeVerificationCode | null =
		await ctx.prisma.oneTimeVerificationCode.findFirst({
			where: {
				code
			}
		});

	return verificationCode as OneTimeVerificationCode;
}

export async function verifyUser(ctx: Context, code: OneTimeVerificationCode) {
	if (!code) {
		return {
			field: 'verificationCode',
			message: 'code invalid and may be expired'
		};
	}

	await ctx.prisma.user
		.update({
			where: {
				userID: code.UseruserID
			},
			data: {
				verified: true
			}
		})
		.catch((err) => {
			console.log(err);
		});
	return;
}
