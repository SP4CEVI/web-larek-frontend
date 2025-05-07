export abstract class Component<RenderData extends object> {
	private data: Partial<RenderData> = {};

	protected constructor(protected readonly container: HTMLElement) {}

	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	protected updateTextContent(element: HTMLElement, value: unknown) {
		if (element) element.textContent = String(value);
	}

	setElementDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	protected updateImageSource(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	render(data: Partial<RenderData>): HTMLElement {
		Object.assign(this.data, data);
		this.Show(this.data);
		return this.container;
	}

	protected abstract Show(data: Partial<RenderData>): void;
}
