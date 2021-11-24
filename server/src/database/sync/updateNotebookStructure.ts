import {Context, Item} from '../../types';

export async function updateNotebookStructure(ctx: Context, notebookStructure: Item) {
    const response = await ctx.prisma.notebookItem.update({
        data: {
            content: notebookStructure.content
        },
        where: {
            id: notebookStructure.id
        }
    })

    return response !== undefined;
}