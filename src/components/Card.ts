import { Product } from "../types/index"

class Card {
    private product: Product;

    constructor(product: Product) {
        this.product = product;
    }

    get id(): string {
        return this.product.id;
    }

    set title(newTitle: string) {
        this.product.title = newTitle;
    }

    set image(newImage: string) {
        this.product.image = newImage;
    }

    set price(newPrice: number) {
        this.product.price = newPrice;
    }

    set category(newCategory: string) {
        this.product.category = newCategory;
    }

    set description(newDescription: string) {
        this.product.description = newDescription;
    }

    render(): string {
        return `
            <div class="card" data-id="${this.product.id}">
                <img src="${this.product.image}" alt="${this.product.title}">
                <h3>${this.product.title}</h3>
                <p>Price: $${this.product.price.toFixed(2)}</p>
                <p>Category: ${this.product.category}</p>
                <p>${this.product.description}</p>
                <button class="add-to-basket">Add to Basket</button>
            </div>
        `;
    }
}