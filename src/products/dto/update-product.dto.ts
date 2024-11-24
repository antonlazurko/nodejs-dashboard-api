import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateProductDto {
	@IsOptional()
	@IsString({ message: 'Name must be a string' })
	name?: string;

	@IsOptional()
	@IsString({ message: 'Description must be a string' })
	description?: string;

	@IsOptional()
	@IsInt({ message: 'Price must be an integer' })
	price?: number;

	@IsOptional()
	@IsString({ message: 'Brand must be a string' })
	brand?: string;

	@IsOptional()
	@IsString({ message: 'Color must be a string' })
	color?: string;

	@IsOptional()
	@IsInt({ message: 'Size must be an integer' })
	size?: number;

	@IsOptional()
	@IsInt({ message: 'Quantity must be an integer' })
	quantity?: number;

	@IsOptional()
	isNewState?: boolean;
}
