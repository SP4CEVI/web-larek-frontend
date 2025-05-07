
export type PaymentMethod = 'cash' | 'card';

export type ProductType = 'хард-скил' | 'софт-скил' | 'дополнительное' | 'кнопка' | string;

export interface IProduct {
	id: string;
	title: string;
	image: string;
	price: number;
	description: string;
	category: ProductType;
}

export interface IOrder {
	email: string;
	phone: string;
	address: string;
	payment: PaymentMethod | null;
	total: number;
	items: string[];
}

export interface ITotal {
	id: string;
	total: number;
}
