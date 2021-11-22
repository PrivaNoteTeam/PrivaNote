import { Context } from "../../types";
import { Page } from '@prisma/client';

export async function addFile(ctx: Context, file: Page) {
    const response = await ctx.prisma.page.create({
        data: file
    });

    return response !== undefined;
}