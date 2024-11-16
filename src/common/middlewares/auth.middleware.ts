import { Request, Response, NextFunction } from 'express';

import { IMiddleware } from '../interfaces/middleware.interface';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			await this.verifyJWT(token, req, res, next);
			return;
		}
		next();
	}
	async verifyJWT(token: string, req: Request, res: Response, next: NextFunction): Promise<void> {
		verify(token, this.secret, (err, payload) => {
			if (err) {
				next();
			} else if (payload) {
				if (typeof payload !== 'string') {
					req.user = payload.email;
					next();
				}
			}
		});
	}
}
