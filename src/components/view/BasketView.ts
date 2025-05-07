import { createElement, ensureElement, formatNumber } from '../../utils/utils';
import { Component } from '../base/Components';

interface IBasketAction {
	onClick: (event: MouseEvent) => void;
}

interface IBasketView {
	items: HTMLElement[];
	total: number;
}

interface ICardBasketActions {
	onCardButtonDeleteClick: (event: MouseEvent) => void;
}

interface ICardBasket {
	index: number;
	title: string;
	price: number;
}

export class CardBasketView extends Component<ICardBasket> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _buttonDelete: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ICardBasketActions) {
		super(container);

		this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);

		this._title = ensureElement<HTMLElement>('.card__title', this.container);
		this._price = ensureElement<HTMLElement>('.card__price', this.container);
		this._buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

		this._buttonDelete.addEventListener('click', actions.onCardButtonDeleteClick);
	}

	protected Show(data: Partial<ICardBasket>): void {
		if (data.index !== undefined) this.updateTextContent(this._index, formatNumber(data.index));

		if (data.price !== undefined) this.updateTextContent(this._price, `${formatNumber(data.price)} синапсов`);

		if (data.title !== undefined) this.updateTextContent(this._title, data.title);
	}
}

export class BasketView extends Component<IBasketView> {

	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _buttonBasket: HTMLButtonElement;

	constructor(container: HTMLElement, actions: IBasketAction) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = ensureElement<HTMLElement>('.basket__price',this.container);
		this._buttonBasket = ensureElement<HTMLButtonElement>('.basket__button', this.container);

		this._buttonBasket.addEventListener('click', actions.onClick);

		this.setItems([])
		this.setTotal(0)
	}

	protected Show(data: Partial<IBasketView>): void {
		if (data.items !== undefined) this.setItems(data.items);

		if (data.total !== undefined) this.setTotal(data.total);
	}

	private setItems(items: HTMLElement[]) {
		if(items.length) {
			this._list.replaceChildren(...items);
			this.setElementDisabled(this._buttonBasket, false);
		} else {
			this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста',
			}));

			this.setElementDisabled(this._buttonBasket, true);
		}
	}

	private setTotal(total: number) {
		if (total > 0) this.updateTextContent(this._total, `${formatNumber(total)} синапсов`);
		else this.updateTextContent(this._total, '');
	}
}