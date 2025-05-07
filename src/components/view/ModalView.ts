import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';

export interface IModalActions {
	onClose: () => void;
}

interface IModalContent {
	content: HTMLElement;
}

export class ModalView extends Component<IModalContent> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, actions: IModalActions) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', actions.onClose);
		this.container.addEventListener('click', actions.onClose);
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	protected Show(data: Partial<IModalContent>): void {
		if (data.content !== undefined) this.setContent(data.content);
	}

	private setContent(value: HTMLElement | null) {
		if (value) this._content.replaceChildren(value);
		else this._content.replaceChildren();
	}

	open(): void {
		this.container.classList.add('modal_active');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.setContent(null);
	}
}
