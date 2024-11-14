import { Router, Response } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { IControllerRoute, ExpressReturnType } from './routes.interface';
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
	public ok<T>(response: Response, message: T): ExpressReturnType {
		return this.send<T>(response, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
