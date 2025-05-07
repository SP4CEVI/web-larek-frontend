import { Api, ApiListResponse } from '../base/Api';
import { IOrder, ITotal, IProduct } from '../../types';

interface IStore {
	getProductItem(id: string): Promise<IProduct>;
	getProductList(): Promise<IProduct[]>;
	orderProducts(order: IOrder): Promise<ITotal>;
}

export class StoreModel extends Api implements IStore {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductItem(id: string): Promise<IProduct> {
		return this.get<IProduct>(`/product/${id}`).then((item) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<IProduct[]> {
		return this.get<ApiListResponse<IProduct>>('/product/').then((data) =>
			data.items.map((item: IProduct) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderProducts(order: IOrder): Promise<ITotal> {
		return this.post<ITotal>('/order', order).then(
			(data: ITotal) => data
		);
	}
}
