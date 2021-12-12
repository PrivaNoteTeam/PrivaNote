import { Context, Item } from '../../types';

export async function updateItem(ctx: Context, item: Item) {
    const response = await ctx.prisma.notebookItem.update({
        data: {
            content: item.content
        },
        where: {
            id: item.id
        }
    });

    return response !== undefined;
}