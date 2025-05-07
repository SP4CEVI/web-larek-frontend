import { Model } from '../base/Model';
import { IProduct } from '../../types';

export interface IBasket {
	products: IProduct[];
	total: number;
}

export enum BasketEvents {
	ADD = 'basket:add',
	REMOVE = 'basket:remove',
	CLEAR = 'basket:clear',
	CHANGED ='basket:changed',
}

export class BasketModel extends Model {
	private products: IProduct[] = [];

	getProducts(): IProduct[] {
		return this.products;
	}

	add(product: IProduct) {
		this.products.push(product);
		this.changed();
	}

	getTotal(): number {
		return this.products.reduce((total, product) => total + product.price, 0);
	}

	remove(product: IProduct) {
		this.products = this.products.filter(
			(cartProduct) => cartProduct.id !== product.id
		);
		this.changed();
	}

	clear() {
		this.products = [];
		this.changed();
	}

	private changed() {
		this.emitChanges(BasketEvents.CHANGED, {
			products: this.getProducts(),
			total: this.getTotal(),
		} as IBasket);
	}

	isAddedToBasket(product?: IProduct) {
		if (product) {
			const basketProducts = this.getProducts();
			return (
				basketProducts.find((basketProduct) => {
					return basketProduct.id === product.id;
				}) !== undefined
			);
		}

		return false;
	}
}
