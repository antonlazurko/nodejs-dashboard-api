import { CreateProductDto } from '../dto/create-product.dto';
import { ProductModel } from '@prisma/client';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface IProductService {
	createProduct(dto: CreateProductDto): Promise<ProductModel | null>;
	updateProduct(id: string, data: UpdateProductDto): Promise<ProductModel | null>;
	removeProduct(id: string): Promise<void>;
}
