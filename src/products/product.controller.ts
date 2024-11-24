import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { isValidObjectId } from 'mongoose';

import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types/types';
import { IProductController } from './interfaces/product.controller.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { IProductService } from './interfaces/product.service.interface';
import { ValidateMiddleware } from '../common/middlewares/validate.middleware';
import { UpdateProductDto } from './dto/update-product.dto';

@injectable()
export class ProductController extends BaseController implements IProductController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IProductService) private productService: IProductService,
	) {
		super(loggerService);

		this.bindRoutes(
			[
				{
					path: '/',
					method: 'post',
					func: this.create,
					middlewares: [new ValidateMiddleware(CreateProductDto)],
				},
				{
					path: '/:id',
					method: 'patch',
					func: this.update,
					middlewares: [new ValidateMiddleware(UpdateProductDto)],
				},
			],
			'/products',
		);
	}
	async create(
		{ body }: Request<object, object, CreateProductDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const result = await this.productService.createProduct(body);
			if (!result) {
				return next(new HttpError('Product already exist', 409, 'register'));
			}
			this.loggerService.log(`[ProductController create] Product ${result.name} was created.`);
			this.ok(res, { name: result.name, id: result.id }, 201);
		} catch (error) {
			next(error);
		}
	}

	async update(
		req: Request<{ id: string }, any, UpdateProductDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { id } = req.params;
		const data = req.body;

		if (!id) {
			return next(
				new HttpError(
					'Product ID is required. Please provide an ID',
					400,
					'ProductController update',
				),
			);
		}

		if (!isValidObjectId(id)) {
			return next(
				new HttpError(
					'Invalid ID format. Please provide a valid ObjectID',
					400,
					'ProductController update',
				),
			);
		}

		try {
			const updatedProduct = await this.productService.updateProduct(id, data);

			if (!updatedProduct) {
				return next(new HttpError('Product not found', 404, 'update'));
			}

			this.loggerService.log(
				`[ProductController update] Product ${updatedProduct.name} was updated.`,
			);
			this.ok(res, updatedProduct, 200);
		} catch (error) {
			next(error);
		}
	}
}
