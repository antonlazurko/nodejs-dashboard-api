import { CreateProductDto } from '../dto/create-product.dto';
import { ProductModel } from '@prisma/client';

export interface IProductService {
	createProduct(dto: CreateProductDto): Promise<ProductModel | null>;
}
