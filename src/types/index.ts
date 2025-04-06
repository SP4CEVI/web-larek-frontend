export interface Product {
    id: string;
    title: string;
    category: string;
    description: string;
    price: number | null;
    image: string;
}

type ApiProductResponse = Product;

type PaymentType = 'online' | 'cash';

interface Client {
    paymentMethod: string;
    deliveryAddress: string;
    emailAddress: string;
    phoneNumber: string;
}

interface Order {
    itemIds: string[];
    totalAmount: number;
    paymentMethod: PaymentType;
    deliveryAddress: string;
    emailAddress: string; 
    phoneNumber: string;
}

type OrderItem = Pick<Product, 'id' | 'title' | 'price'>;
type GalleryItem = Omit<Product, 'description'>;
type DeliveryOptions = Pick<Client, 'paymentMethod' | 'deliveryAddress'>;
type ContactDetails = Pick<Client, 'emailAddress' | 'phoneNumber'>;

type OrderDetails = DeliveryOptions & ContactDetails;

interface OrderConfirmation {
    orderId: string;
    totalAmount: number;
}

type ApiOrderConfirmationResponse = OrderConfirmation;

type SuccessResponse = Pick<OrderConfirmation, 'totalAmount'>;

type FormValidationErrors<T> = Partial<Record<keyof T, string | null>>;

interface Basket {
    products: Product[];
    totalPrice: number;
    addProduct(product: Product): void;
    removeProduct(productId: string): void;
    clear(): void;
    updateTotalPrice(priceChange: number): void;
}

interface Card {
    product: Product;
    render(): string;
}

interface Modal {
    open(content: string): void;
    close(): void;
}