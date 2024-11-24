import { ProductModel } from '@prisma/client';
import { Product } from '../product.entity';

export interface IProductRepository {
	createProduct(product: Product): Promise<ProductModel>;
	findByName(name: string): Promise<ProductModel | null>;
	updateProduct(id: string, data: Partial<Product>): Promise<ProductModel | null>;
}
