import 'reflect-metadata';
import { Router, Response } from 'express';
import { injectable } from 'inversify';

import { IControllerRoute, ExpressReturnType } from './interfaces/routes.interface';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public created(response: Response): void {
		response.status(201);
	}
	public send<T>(response: Response, code: number, message: T): ExpressReturnType {
		response.type('application/json');
		return response.status(code).json(message);
	}
	public ok<T>(response: Response, message: T, code: number): ExpressReturnType {
		return this.send<T>(response, code, message);
	}

	protected bindRoutes(routes: IControllerRoute[], basePath: string = ''): void {
		for (const route of routes) {
			const fullPath = `${basePath}${route.path}`;
			this.logger.log(`[${route.method}] ${fullPath}`);
			const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
