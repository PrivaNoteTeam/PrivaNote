import { PrismaClient, User as SchemaUser } from '@prisma/client';

// export interface UserSession {
// 	id: number;
// 	email: string;
// 	password: string;
// }

export interface Context {
	prisma: PrismaClient;
}

export interface CreateUserData {
	email: string;
	password: string;
}

export type RegisterData = CreateUserData;

export type User = Omit<SchemaUser, 'password'>;

export type LoginData = CreateUserData; // need to refactor
