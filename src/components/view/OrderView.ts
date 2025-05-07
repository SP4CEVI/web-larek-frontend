import { ensureElement } from '../../utils/utils';
import { PaymentMethod } from '../../types';
import { Component } from '../base/Components';

interface IOrderActions {
	onOnlineClick: (event: MouseEvent) => void;
	onOfflineClick: (event: MouseEvent) => void;
	onContinueButtonClick: (event: MouseEvent) => void;
	onAddressInput: (event: Event) => void;
}

interface IOrder {
	payment: PaymentMethod;
	address: string;
	valid: boolean;
	error: string;
}

export class OrderView extends Component<IOrder> {
	protected _online: HTMLButtonElement;
	protected _offline: HTMLButtonElement;
	protected _address: HTMLInputElement;
	protected _continue: HTMLButtonElement;
	protected _error: HTMLElement;

	constructor(container: HTMLFormElement, actions: IOrderActions) {
		super(container);

		this._online = ensureElement<HTMLButtonElement>('button[name=card]', this.container);
		this._offline = ensureElement<HTMLButtonElement>('button[name=cash]', this.container);
		this._address = ensureElement<HTMLInputElement>('input[name=address]', this.container);
		this._continue = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

		this._error = ensureElement<HTMLElement>('.form__errors', this.container);

		this._online.addEventListener('click', actions.onOnlineClick);
		this._offline.addEventListener('click', actions.onOfflineClick);
		this._continue.addEventListener('click', actions.onContinueButtonClick);
		this._address.addEventListener('input', actions.onAddressInput);
	}

	protected Show(data: Partial<IOrder>): void {
		if (data.valid !== undefined) this.setElementDisabled(this._continue, !data.valid);

		if (data.payment !== undefined) this.setPayment(data.payment);

		if (data.address !== undefined) this._address.value = data.address;

		if (data.error !== undefined) this._error.textContent = data.error;
	}

	private setPayment(payment: PaymentMethod | undefined) {
		this.toggleClass(this._online, 'button_alt-active', payment === 'card');
		this.toggleClass(this._offline, 'button_alt-active', payment === 'cash');
	}
}
