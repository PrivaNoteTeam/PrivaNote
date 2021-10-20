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

    test.skip('creates a user', async () => {
        const data: CreateUserData = {
            email: 'john.doe@email.com',
            password: 'Password123!'
        }
        
        const result = await createUser(ctx, data);

        expect(ctx.prisma.user.create).toHaveBeenCalled();
        expect(result).resolves.toBeTruthy()
    });

    test('does not create a user which has an already taken email', async () => {
        const data: CreateUserData = {
            email: 'john.doe@email.com',
            password: 'Password123'
        }

        await createUser(ctx, data);
        const result = await createUser(ctx, data);

        expect(result).toBeUndefined();
    })
})