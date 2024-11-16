import { Request, Response, NextFunction, Router } from 'express';

import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	// method: 'get' | 'post' | 'patch' | 'put' | 'delete';
	method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put' | 'delete'>; // using utility types
	middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
