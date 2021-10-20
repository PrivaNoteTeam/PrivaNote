import { MockContext } from '../types';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

export const createMockContext = () => {
    return {
        prisma: mockDeep<PrismaClient>()
    } as MockContext
}