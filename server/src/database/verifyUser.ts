import { Context } from '../types';

export async function verifyUser(ctx: Context, code: string) {
	const verificationCode = await ctx.prisma.oneTimeVerificationCode.findFirst(
		{
			where: {
				code
			}
		}
	);

	if (!verificationCode) {
		return {
			field: 'verificationCode',
			message: 'code invalid and may be expired'
		};
	}

	ctx.prisma.user.update({
		where: {
			userID: verificationCode.UseruserID
		},
		data: {
			verified: true
		}
	});
	return;
}
