import { generateCode } from '../generateCode';
import { Context, MockContext, User } from '../../types';
import { createMockContext } from '../../mocks/createMockContext';

describe('generateCode service', () => {
	let ctx: Context;
	let mockCtx: MockContext;
	let user: User;

	beforeEach(() => {
		user = {
			email: 'john.doe@email.com',
			userID: 1,
			verified: true,
			firstName: null,
			lastName: null
		};

		mockCtx = createMockContext();
		ctx = mockCtx as unknown as Context;
	});

	test('generates a six digit code', async () => {
		const result = await generateCode(ctx, user);

		expect(result.length).toBe(6);
	});

	test('generates a random "unique" code', async () => {
		const firstResult = await generateCode(ctx, user);
		const secondResult = await generateCode(ctx, user);

		expect(firstResult).not.toMatch(secondResult);
	});
});
