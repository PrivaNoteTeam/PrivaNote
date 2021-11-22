import { Context } from '../../types';
import { Folder } from '@prisma/client';

export async function addFolder(ctx: Context, folder: Folder) {
    const response = await ctx.prisma.folder.create({
        data: folder
    });

    return response !== undefined;
}