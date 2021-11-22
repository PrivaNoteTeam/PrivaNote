import { Context } from '../../types';

export async function deleteFolder(ctx: Context, folderId: string) {
    const response = await ctx.prisma.folder.delete({
        where: {
            folderID: folderId as unknown as number
        }
    });

    return response !== undefined;
}