import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ProductModel } from '@prisma/client';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { IProductService } from './interfaces/product.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';
import { IProductRepository } from './interfaces/product.repository.interface';

@injectable()
export class ProductService implements IProductService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IProductRepository) private productRepository: IProductRepository,
	) {}
	async createProduct(product: CreateProductDto): Promise<ProductModel | null> {
		const newProduct = new Product(
			product.name,
			product.description,
			product.brand,
			product.color,
			product.price,
			product.size,
			product.quantity,
			product.isNewState,
		);
		return this.productRepository.createProduct(newProduct);
	}
}
