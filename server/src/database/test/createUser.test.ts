import { Context, MockContext, CreateUserData } from '../../types';
import { createMockContext} from '../../mocks/createMockContext';
import { createUser } from '../createUser';

describe('createUser database operator', () => {
    let ctx: Context;
    let mockCtx: MockContext;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    const sampleUserData: CreateUserData = {
        email: 'john.doe@email.com',
        password: 'Password123!'
    }

    test.skip('creates a user', async () => {
        const result = createUser(ctx, sampleUserData);

        expect(ctx.prisma.user.create).toHaveBeenCalled();
        expect(result).resolves.toHaveProperty('email');
    });

    test('does not create a user which has an already taken email', async () => {
        await createUser(ctx, sampleUserData);
        const result = createUser(ctx, sampleUserData);

        expect(result).resolves.toBeUndefined();
    });

    test('does not return password for security purposes', async () => {
        const result = createUser(ctx, sampleUserData);

       expect(result).resolves.not.toBeUndefined();
       expect(result).resolves.not.toHaveProperty('password');
    });
})