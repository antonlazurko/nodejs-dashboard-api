import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ProductModel } from '@prisma/client';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { IProductService } from './interfaces/product.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';
import { IProductRepository } from './interfaces/product.repository.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@injectable()
export class ProductService implements IProductService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IProductRepository) private productRepository: IProductRepository,
	) {}
	async createProduct({
		name,
		description,
		brand,
		color,
		price,
		size,
		quantity,
		isNewState,
	}: CreateProductDto): Promise<ProductModel | null> {
		const newProduct = new Product(
			name,
			description,
			brand,
			color,
			price,
			size,
			quantity,
			isNewState,
		);
		return this.productRepository.createProduct(newProduct);
	}
	async updateProduct(id: string, data: UpdateProductDto): Promise<ProductModel | null> {
		return this.productRepository.updateProduct(id, data);
	}
	async removeProduct(id: string): Promise<void> {
		const existingProduct = await this.productRepository.getProductById(id);

		if (!existingProduct) {
			throw new Error('Product not found');
		}

		if (existingProduct.quantity > 1) {
			await this.productRepository.updateProduct(id, { quantity: existingProduct.quantity - 1 });
		} else {
			await this.productRepository.removeProduct(id);
		}
	}
}
