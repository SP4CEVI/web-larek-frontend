import { Model } from '../base/Model';
import { PaymentMethod } from '../../types';

export interface IOrderChange {
	address: string;
	payment?: PaymentMethod;
	isValid: boolean;
	error: string;
}

export enum OrderEvent {
	ORDER_CHANGED = 'checkout:orderChanged',
}


export class OrderModel extends Model {
	private _payment?: PaymentMethod;
	private addressOrder = '';

	getPayment(): PaymentMethod | null {
		return this._payment ?? null;
	}

	setPayment(payment?: PaymentMethod) {
		this._payment = payment;
		this.orderChanged();
	}

	getAddress(): string {
		return this.addressOrder;
	}

	setAddress(address: string) {
		this.addressOrder = address;
		this.orderChanged();
	}

	private getValid(): boolean {
		return this._payment !== undefined && this.addressOrder.length > 0;
	}

	getError(): string {
		return this._payment == undefined
			? 'Необходимо выбрать способ оплаты'
			: this.addressOrder.length <= 0
				? 'Необходимо заполнить адрес'
				: '';
	}
	
	private orderChanged() {
		this.emitChanges(OrderEvent.ORDER_CHANGED, {
			payment: this._payment,
			address: this.addressOrder,
			isValid: this.getValid(),
			error: this.getError(),
		} as IOrderChange);
	}

}
