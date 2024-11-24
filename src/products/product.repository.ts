import 'reflect-metadata';
import { ProductModel, Prisma } from '@prisma/client';
import { inject } from 'inversify';

import { IProductRepository } from './interfaces/product.repository.interface';
import { Product } from './product.entity';
import { TYPES } from '../types/types';
import { PrismaService } from '../database/prisma.service';
import { HttpError } from '../errors/http-error.class';

export class ProductRepository implements IProductRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async createProduct({
		name,
		description,
		price,
		brand,
		color,
		size,
		quantity,
		isNewState,
	}: Product): Promise<ProductModel> {
		return this.prismaService.client.productModel.create({
			data: {
				name,
				description,
				price,
				quantity,
				isNewState,
				brand: brand,
				color: color,
				size: size,
			},
		});
	}
	async findByName(name: string): Promise<ProductModel | null> {
		return this.prismaService.client.productModel.findFirst({ where: { name } });
	}
	async updateProduct(id: string, data: Partial<Product>): Promise<ProductModel | null> {
		try {
			return await this.prismaService.client.productModel.update({
				where: { id },
				data,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					throw new HttpError('Product not found', 404, 'ProductRepository updateProduct');
				}
			}
			throw new HttpError('An unexpected error occurred.', 500, 'ProductRepository updateProduct');
		}
	}
}
