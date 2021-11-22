import { PrismaClient, User as SchemaUser } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended/lib/cjs/Mock';

// Entities
export type User = Omit<SchemaUser, 'password'>;
// Context
export interface Context {
	prisma: PrismaClient;
}
export type MockContext = {
	prisma: DeepMockProxy<PrismaClient>;
};
// Form Data
export interface CreateUserData {
	email: string;
	password: string;
}
export type RegisterData = CreateUserData;
export type LoginData = CreateUserData; // need to refactor

export interface NotebookItem {
	id: string;
	cloudIds: cloudIds;
	name: string;
	mimeType: string;
	paths: string[];
	dateCreated: string;
	lastModified: string;
	content?: string;
}

export type NotebookStructure = NotebookItem[];
