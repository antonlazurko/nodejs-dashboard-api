import { ProductModel } from '@prisma/client';
import { Product } from '../product.entity';

export interface IProductRepository {
	createProduct(product: Product): Promise<ProductModel>;
	findByName(name: string): Promise<ProductModel | null>;
}
