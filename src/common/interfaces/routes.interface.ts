import { Request, Response, NextFunction, Router } from 'express';

import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request<any, any, any, any>, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put' | 'delete'>;
	middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
