import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

interface IPageActions {
	onBasketClick: (event: MouseEvent) => void;
}

export class PageView extends Component<IPage> {
	protected _wrapper: HTMLElement;
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, actions: IPageActions) {
		super(container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', actions.onBasketClick);
	}

	protected show(data: Partial<IPage>): void {
		if (data.counter !== undefined)this.updateTextContent(this._counter, String(data.counter));

		if (data.catalog !== undefined) this._catalog.replaceChildren(...data.catalog);

		if (data.locked !== undefined) this.setLocked(data.locked);
	}

	private setLocked(value: boolean) {
		if (value) this._wrapper.classList.add('page__wrapper_locked');
		else this._wrapper.classList.remove('page__wrapper_locked');
	}
}
