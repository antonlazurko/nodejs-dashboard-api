import { compare, hash } from 'bcryptjs';

export class Product {
	constructor(
		private readonly _description: string,
		private readonly _name: string,
		private readonly _brand: string,
		private readonly _color: string,
		private readonly _price: number,
		private readonly _size: number,
		private readonly _quantity: number,
		private readonly _isNewState: boolean,
	) {}

	get description(): string {
		return this._description;
	}

	get name(): string {
		return this._name;
	}

	get brand(): string {
		return this._brand;
	}

	get color(): string {
		return this._color;
	}

	// get categories(): string[] {
	// 	return this._categories;
	// }

	// get images(): string[] {
	// 	return this._images;
	// }

	get price(): number {
		return this._price;
	}

	get size(): number {
		return this._size;
	}

	get quantity(): number {
		return this._quantity;
	}

	get isNewState(): boolean {
		return this._isNewState;
	}
}
