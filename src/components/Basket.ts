import { Product } from "../types/index"

class Basket {
    private products: Product[] = [];
    private totalPrice: number = 0;

    updateProductsList(listElement: HTMLElement): void {
        listElement.innerHTML = this.products.map(product => `
            <div class="basket-item" data-id="${product.id}">
                <h4>${product.title}</h4>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button class="remove-from-basket">Remove</button>
            </div>
        `).join('');
        this.dispatchEvent('basket:change');
        this.updateTotalPrice(this.totalPrice);
    }

    updateTotalPrice(price: number): void {
        this.totalPrice += price;
    }

    addProduct(product: Product): void {
        this.products.push(product);
        this.updateTotalPrice(product.price);
        this.dispatchEvent('item:add');
    }

    removeProduct(productId: string): void {
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
            const removedProduct = this.products.splice(productIndex, 1)[0];
            this.updateTotalPrice(-removedProduct.price);
            this.dispatchEvent('item:remove');
        }
    }

    clear(): void {
        this.products = [];
        this.totalPrice = 0;
        this.dispatchEvent('basket:clear');
    }

    private dispatchEvent(eventName: string): void {
        const event = new Event(eventName);
        window.dispatchEvent(event);
    }
}