import { Context } from '../../types';

export async function downloadItem(ctx: Context, itemId: string) {
	console.log(itemId);
	const response = await ctx.prisma.notebookItem.findUnique({
		where: {
			id: itemId
		}
	});

	return response !== null ? response : undefined;
}
