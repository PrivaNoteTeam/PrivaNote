import { Context, Item } from '../../types';

export async function addItem(ctx: Context, item: Item) {
	const response = await ctx.prisma.notebookItem.create({
		data: {
			id: item.id,
			content: item.content
		}
	});

	return response !== undefined;
}
