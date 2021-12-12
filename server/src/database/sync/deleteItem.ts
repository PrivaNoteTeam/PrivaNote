import { Context } from '../../types';

export async function deleteItem(ctx: Context, itemId: string) {
    const response = await ctx.prisma.notebookItem.delete({
        where: {
            id: itemId
        }
    });

    return response !== undefined;
}