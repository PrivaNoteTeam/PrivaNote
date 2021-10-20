import { Context } from '../types';
import { Request, Response, NextFunction } from 'express';

export const setupContext = (ctx: Context) => {
	return (req: Request, _: Response, next: NextFunction) => {
		req.ctx = ctx;
		next();
	};
};
