import { Context } from '../../types';

export async function deleteFile(ctx: Context, fileId: string) {
    const response = await ctx.prisma.page.delete({
        where: {
            pageID: fileId as unknown as number // FIX when pageId is string
        }
    });

    return response !== undefined;
}