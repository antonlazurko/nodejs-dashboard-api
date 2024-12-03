import {
	IsInt,
	IsString,
	IsArray,
	ArrayNotEmpty,
	ArrayMinSize,
	IsOptional,
	IsBoolean,
} from 'class-validator';

export class CreateProductDto {
	@IsString({ message: 'Name must be a string and is required' })
	name: string;

	@IsString({ message: 'Description must be a string and is required' })
	description: string;

	@IsInt({ message: 'Price must be an integer and is required' })
	price: number;

	@IsInt({ message: 'Size must be an integer and is required' })
	size: number;

	@IsInt({ message: 'Quantity must be an integer and is required' })
	quantity: number;

	@IsString({ message: 'Brand must be a string and is required' })
	brand: string;

	@IsString({ message: 'Color must be a string and is required' })
	color: string;

	@IsBoolean({ message: 'IsNewState must be a boolean and is required' })
	isNewState: boolean;

	// @IsArray({ message: 'Categories must be an array' }) //TODO: work with arrays
	// @ArrayNotEmpty({ message: 'Categories must not be empty' })
	// @IsString({ each: true, message: 'Each category must be a string' })
	// categories: string[];

	// @IsArray({ message: 'Images must be an array' })
	// @ArrayMinSize(1, { message: 'At least one image is required' })
	// @IsString({ each: true, message: 'Each image URL must be a string' })
	// images: string[];
}
