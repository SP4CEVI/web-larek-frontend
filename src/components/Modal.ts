class Modal {
    private modalElement: HTMLElement;

    constructor() {
        this.modalElement = document.createElement('div');
        this.modalElement.classList.add('modal');
        document.body.appendChild(this.modalElement);
        this.modalElement.style.display = 'none';
    }

    open(content: string): void {
        this.modalElement.innerHTML = content;
        this.modalElement.style.display = 'block';
        this.dispatchEvent('modal:open');
    }

    close(): void {
        this.modalElement.style.display = 'none';
        this.modalElement.innerHTML = '';
        this.dispatchEvent('modal:close');
    }

    render(content: string): void {
        this.modalElement.innerHTML = content;
    }

    private dispatchEvent(eventName: string): void {
        const event = new Event(eventName);
        this.modalElement.dispatchEvent(event);
    }
}
