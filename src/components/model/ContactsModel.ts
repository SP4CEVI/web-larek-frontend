import { Model } from '../base/Model';

export interface IContactsChange {
	email: string;
	phone: string;
	isValid: boolean;
	error: string;
}

export enum ContactsEvent {
	CONTACTS_CHANGED = 'checkout:contactsChanged',
}

export class ContactsModel extends Model {
	private _email = '';
	private _phone = '';

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

	private getValid(): boolean {
		return this._email.length > 0 && this._phone.length > 0;
	}

	getError(): string {
		return this._email.length <= 0 
			? 'Необходимо заполнить Email'
			: this._phone.length <= 0 
				? 'Необходимо заполнить телефон' 
				: '';
	}
	
	private contactsChanged() {
		this.emitChanges(ContactsEvent.CONTACTS_CHANGED, {
			email: this._email,
			phone: this._phone,
			isValid: this.getValid(),
			error: this.getError(),
		} as IContactsChange);
	}

}
