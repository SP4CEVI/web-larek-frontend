import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';

interface IContactActions {
	onEmailInput: (event: Event) => void;
	onPhoneInput: (event: Event) => void;
	onToPayButtonClick: (event: MouseEvent) => void;
}

interface IContact {
	email: string;
	phone: string;
	valid: boolean;
	error: string;
}

export class ContactsView extends Component<IContact> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	protected _button: HTMLButtonElement;
	protected _error: HTMLElement;

	constructor(container: HTMLFormElement, actions: IContactActions) {
		super(container);

		this._email = ensureElement<HTMLInputElement>('input[name=email]', this.container);
		this._phone = ensureElement<HTMLInputElement>('input[name=phone]', this.container);
		this._button = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
		this._error = ensureElement<HTMLElement>('.form__errors', this.container);

		this._email.addEventListener('input', actions.onEmailInput);
		this._phone.addEventListener('input', actions.onPhoneInput);
		this._button.addEventListener('click', actions.onToPayButtonClick);
	}

	protected Show(data: Partial<IContact>): void {
		if (data.valid !== undefined) this.setElementDisabled(this._button, !data.valid);

		if (data.email !== undefined) this._email.value = data.email;

		if (data.phone !== undefined) this._phone.value = data.phone;

		if (data.error !== undefined) this._error.textContent = data.error;
	}
}