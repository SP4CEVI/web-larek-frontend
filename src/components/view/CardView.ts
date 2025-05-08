import { ensureElement } from '../../utils/utils';
import { ProductType } from '../../types';
import { Component } from '../base/Components';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard {
	id: string;
	title: string;
	image: string;
	price: number | null;
	description: string;
	category: ProductType;
}

interface ICardCheck extends ICard {
	isInBasket: boolean;
}

export abstract class CardView<RenderData extends ICard> extends Component<RenderData> {
	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement | null;
	protected _button: HTMLButtonElement | null;

	constructor(protected container: HTMLElement, actions?: ICardActions) {
		super(container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._description = container.querySelector('.card__text');
		this._button = container.querySelector('.card__button');

		if (actions?.onClick) {
			if (this._button) this._button.addEventListener('click', actions.onClick);
			else container.addEventListener('click', actions.onClick);
		}
	}

	protected show(data: Partial<RenderData>) {
		if (data.title !== undefined) this.updateTextContent(this._title, data.title);

		if (data.image !== undefined) this.updateImageSource(this._image, data.image, data.title);

		if (data.category !== undefined) this.setProductCategory(data.category);

		if (data.price !== undefined) this.setProductPrice(data.price);

		if (data.description !== undefined) this.setProductDescription(data.description);
	}

	private setProductCategory(value: ProductType) {
		this.updateTextContent(this._category, value);
		this.toggleClass(this._category, this.getProductCategoryClass(value), true);
	}

	private getProductCategoryClass(value: 'хард-скил' | 'софт-скил' | 'дополнительное' | 'кнопка' | string) {
		let category: string;
		switch (value) {
			case 'хард-скил':
				category = '_hard';
				break;
			case 'софт-скил':
				category = '_soft';
				break;
			case 'дополнительное':
				category = '_additional';
				break;
			case 'кнопка':
				category = '_button';
				break;
			default:
				category = '_other';
		}

		return 'card__category' + category;
	}

	private setProductPrice(price: number | null) {
		if (price === null) this.updateTextContent(this._price, `Бесценно`);
		else this.updateTextContent(this._price, `${price} синапсов`);
	}

	private setProductDescription(value: string) {
		if (this._description) this.updateTextContent(this._description, value);
	}
}

export class CardPreviewView extends CardView<ICardCheck> {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
	}

	protected show(data: Partial<ICardCheck>) {
		super.show(data);

		if (data.price === null) this.setButtonState(false, 'Не продаётся');
		else {
			if (data.isInBasket) this.setButtonState(false, 'Уже в корзине');
			else this.setButtonState(true, 'В корзину');
		}
	}

	private setButtonState(enabled: boolean, text: string) {
		if (this._button) {
			this.setElementDisabled(this._button, !enabled);
			this._button.textContent = text;
		}
	}
}