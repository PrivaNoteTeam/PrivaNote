import { Context } from 'src/types';

export async function verifyUserValidation(
	{ prisma }: Context,
	{ verificationCode }: { verificationCode: string }
) {
	const existingVerificationCode =
		await prisma.oneTimeVerificationCode.findFirst({
			where: { code: verificationCode }
		});

	if (!existingVerificationCode) {
		return {
			field: 'verificationCode',
			message: 'Invalid code. May of expired.'
		};
	}

	return;
}
