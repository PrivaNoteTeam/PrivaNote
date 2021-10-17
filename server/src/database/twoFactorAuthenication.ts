import { Context, User } from '../types';

export async function hasValidAuthCode(
	ctx: Context,
	user: User
): Promise<boolean> {
	try {
		const authCode = await ctx.prisma.oneTimeVerificationCode.findFirst({
			where: {
				UseruserID: user.userID
			}
		});

        if (authCode && authCode.expiresAt > new Date(Date.now())) { // date checker can be removed once chron job is implemented
            return true;
        }
        return false;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export async function deleteAuthCode(
	ctx: Context,
	user: User
): Promise<void> {
	try {
		const authCode = await ctx.prisma.oneTimeVerificationCode.findFirst({
			where: {
				UseruserID: user.userID
			}
		});

        await ctx.prisma.oneTimeVerificationCode.delete({
            where: {
                codeID: authCode?.codeID
            }
        })
	} catch (err) {
		console.error(err);
	}
    return;
}
