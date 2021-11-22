import { Context, User } from './types';
declare module 'express-serve-static-core' {
	export interface Request {
		ctx?: Context;
	}
}

declare module 'express-session' {
	export interface SessionData {
		user: User;
	}
}
