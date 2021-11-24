import { Context } from 'src/types';

export async function getFile(ctx: Context, fileId: string) {
    const response = await ctx.prisma.page.findUnique({
        where: {
            pageID: fileId as unknown as number
        }
    });

    return response !== null ? response : undefined;
}