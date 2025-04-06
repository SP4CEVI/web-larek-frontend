export abstract class Component<T> {
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
  
    protected hideElement(element: HTMLElement) {
        element.style.display = 'none';
    }
  
    protected showElement(element: HTMLElement) {
        element.style.removeProperty('display');
    }
  
    protected updateImageSource(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) element.alt = alt;
        }
    }
  
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
  }