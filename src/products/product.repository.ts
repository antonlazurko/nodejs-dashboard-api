import 'reflect-metadata';
import { ProductModel } from '@prisma/client';
import { inject } from 'inversify';

import { IProductRepository } from './interfaces/product.repository.interface';
import { Product } from './product.entity';
import { TYPES } from '../types/types';
import { PrismaService } from '../database/prisma.service';

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
}
