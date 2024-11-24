import { Request, Response, NextFunction } from 'express';

export interface IProductController {
	create(req: Request, res: Response, next: NextFunction): void;
	update(req: Request, res: Response, next: NextFunction): void;
}
