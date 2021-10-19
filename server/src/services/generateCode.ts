import { createVerificationCode } from '../database/createVerifationCode';
import { customAlphabet } from 'nanoid';
import { Context, User } from '../types';

export async function generateCode(ctx: Context, user: User) {
	const verificationCode = customAlphabet('1234567890abcdef', 6)();
	await createVerificationCode(ctx, verificationCode, user);

	return verificationCode;
}
