import { Context, User } from '../types';

export async function retrieveUserByID(
	ctx: Context,
	id: number
): Promise<User | undefined> {
    try {
        const user: User | null = await ctx.prisma.user.findFirst({
            where: {
                userID: id
            }
        });

        const { password: _, ...userWithoutPassword } = user as unknown as any;
        return userWithoutPassword as User;
    } catch (err) {
        console.log(err)
        return;
    }
}
