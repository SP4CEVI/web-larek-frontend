import { ensureElement, formatNumber } from '../../utils/utils';
import { Component } from '../base/Components';

export interface ISuccessAction {
	onSuccessButtonClick: (event: MouseEvent) => void;
}

export interface ISuccess {
	total: number;
}

export class SuccessView extends Component<ISuccess> {
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ISuccessAction ) {
		super(container);

		this._description = ensureElement<HTMLElement>('.order-success__description', this.container);
		this._button = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

		this._button.addEventListener('click', actions.onSuccessButtonClick);

		this.setTotal(0);
	}

	protected Show(data: Partial<ISuccess>): void {
		if (data.total !== undefined) this.setTotal(data.total);
	}

	private setTotal(total: number) {
		if (total > 0) this.updateTextContent(this._description, `Списано ${formatNumber(total)} синапсов`);
		else this.updateTextContent(this._description, '');
	}
}