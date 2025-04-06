import { ensureElement } from "../utils/utils";
import { Component } from "./base/Components";
import { IEvents } from "./base/events";


interface IPage {
  gallery: HTMLElement[];
  counter: number;
  locked: boolean;
}

export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected _gallery: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this._gallery = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => this.events.emit('basket:open'));
  }

  set counter(value: number) {
    this.updateTextContent(this._counter, String(value));
  }

  set gallery(items: HTMLElement[]) {
    this._gallery.replaceChildren(...items);
  }

  set locked(value: boolean) {
    if (value) this._wrapper.classList.add('page__wrapper_locked');
    else this._wrapper.classList.remove('page__wrapper_locked');
  }
}
