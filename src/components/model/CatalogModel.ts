import { Model } from '../base/Model';
import { IProduct } from '../../types';
import { CatalogEvents } from '../events/CatalogEvents';

export class CatalogModel extends Model {
	private products: IProduct[] = [];

	getProducts(): IProduct[] {
		return this.products;
	}

	setProducts(products: IProduct[]) { 
		this.products = products;
		this.emitChanges(CatalogEvents.CHANGED, products); 
	}
}
