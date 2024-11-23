import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types/types';
import { IProductController } from './interfaces/product.controller.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { IProductService } from './interfaces/product.service.interface';
import { ValidateMiddleware } from '../common/middlewares/validate.middleware';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class ProductController extends BaseController implements IProductController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IProductService) private productService: IProductService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new ValidateMiddleware(CreateProductDto)],
			},
		]);
	}
	async create(
		{ body }: Request<object, object, CreateProductDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.productService.createProduct(body);
		if (!result) {
			return next(new HttpError('Product already exist', 422, 'register'));
		}
		this.loggerService.log(`[ProductController create] Product ${result.name} was created.`);
		this.ok(res, { name: result.name, id: result.id }, 201);
		// try {
		// 	const clothing = await this.clothingService.createClothing(body);
		// 	this.loggerService.log(`[ClothingController create] Clothing ${body.name} was created.`);
		// 	this.ok(res, clothing, 201);
		// } catch (e) {
		// 	next(e);
		// }
	}
}
