import { Model } from '../base/Model';
import { IProduct } from '../../types';

export enum CatalogEvents {
	CHANGED = 'catalog:changed',
}

export class CatalogModel extends Model {
	setProducts(products: IProduct[]) { 
		this.emitChanges(CatalogEvents.CHANGED, products); 
	}
}
