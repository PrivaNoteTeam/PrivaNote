import { Context } from '../../types';
import { Page } from '@prisma/client';

export async function updateFile(ctx: Context, file: Page) {
    const response = await ctx.prisma.page.update({
        data: {
            name: file.name,
            content: file.content,
            updatedAt: file.updatedAt
        },
        where: {
            pageID: file.pageID
        }
    });

    return response !== undefined;
}