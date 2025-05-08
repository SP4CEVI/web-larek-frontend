import { Model } from '../base/Model';
import { PaymentMethod } from '../../types';
import { OrderEvent } from '../events/OrderEvents';

export interface IOrderChange {
	address?: string;
	payment?: PaymentMethod;
	email?: string;
	phone?: string;
	isValid: boolean;
	error: string;
}

export class OrderModel extends Model {
	private _payment?: PaymentMethod;
	private _address = '';
	private _email = '';
	private _phone = '';

	getPayment(): PaymentMethod | null {
		return this._payment ?? null;
	}

	setPayment(payment?: PaymentMethod) {
		this._payment = payment;
		this.orderChanged();
	}

	getAddress(): string {
		return this._address;
	}

	setAddress(address: string) {
		this._address = address;
		this.orderChanged();
	}
	
	getEmail(): string {
		return this._email;
	}

	setEmail(email: string) {
		this._email = email;
		this.contactsChanged();
	}

	getPhone(): string {
		return this._phone;
	}

	setPhone(phone: string) {
		this._phone = phone;
		this.contactsChanged();
	}

	private getValidOrder(): boolean {
		return this._payment !== undefined && 
               this._address.length > 0 ||
               this._email.length > 0 &&
               this._phone.length > 0;
	}

	private getValidContacts(): boolean {
		return this._email.length > 0 &&
               this._phone.length > 0;
	}

	getErrorOrder(): string {
		return this._payment === undefined 
			? 'Необходимо выбрать способ оплаты'
			: this._address.length <= 0 
				? 'Необходимо заполнить адрес' 
				: '';
	}

	getErrorContacts(): string {
		return this._email.length <= 0 
			? 'Необходимо заполнить Email'
			: this._phone.length <= 0 
				? 'Необходимо заполнить телефон' 
				: '';
	}
	
	private orderChanged() {
		this.emitChanges(OrderEvent.ORDER_CHANGED, {
			payment: this._payment,
			address: this._address,
			isValid: this.getValidOrder(),
			error: this.getErrorOrder(),
		} as IOrderChange);
	}

	private contactsChanged() {
		this.emitChanges(OrderEvent.CONTACTS_CHANGED, {
			email: this._email,
			phone: this._phone,
			isValid: this.getValidContacts(),
			error: this.getErrorContacts(),
		} as IOrderChange);
	}
}
