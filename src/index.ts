import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

import { EventEmitter } from './components/base/Events';

import { CheckoutEvent } from './components/events/CheckoutEvents';

import { BasketModel as BasketModel, IBasket, BasketEvents } from './components/model/BasketModel';
import { CatalogModel, CatalogEvents } from './components/model/CatalogModel';
import { ContactsEvent, ContactsModel as ContactsModel, IContactsChange } from './components/model/ContactsModel';
import { ModalModel, ModalEvents } from './components/model/ModalModel';
import { IOrderChange, OrderEvent, OrderModel } from './components/model/OrderModel';
import { StoreModel } from './components/model/StoreModel';
import { ISuccess, SuccessModel as SuccessModel, SuccessEvent } from './components/model/SuccessModel';

import { BasketView, CardBasketView } from './components/view/BasketView';
import { CardPreviewView } from './components/view/CardView';
import { ContactsView } from './components/view/ContactsView';
import { ModalView } from './components/view/ModalView';
import { OrderView } from './components/view/OrderView';
import { PageView } from './components/view/PageView';
import { SuccessView } from './components/view/SuccessView';

import { IProduct } from './types';

const events = new EventEmitter();
const api = new StoreModel(CDN_URL, API_URL);

api
	.getProductList()
	.then((products) => {
		catalogModel.setProducts(products);
	})
	.catch((error) => {
		console.error(error);
	});

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new PageView(document.body, {
	onBasketClick: () => events.emit(ModalEvents.BASKET),
});

const catalogModel = new CatalogModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);
const contactModel = new ContactsModel(events);
const successModel = new SuccessModel(events);
const modalModel = new ModalModel(events);

const modal = new ModalView(ensureElement<HTMLElement>('#modal-container'), {
	onClose: () => modalModel.close(),
});

const basket = new BasketView(cloneTemplate(basketTemplate), {
	onClick: () => events.emit(ModalEvents.ORDER),
});

const order = new OrderView(cloneTemplate(orderTemplate), {
	onOnlineClick: () =>
		events.emit<Pick<IOrderChange, 'payment'>>(CheckoutEvent.PAYMENT_SELECT, { payment: 'card' }),

	onOfflineClick: () =>
		events.emit<Pick<IOrderChange, 'payment'>>(CheckoutEvent.PAYMENT_SELECT, { payment: 'cash' }),

	onContinueButtonClick: (event) => {
		event.preventDefault();
		events.emit(ModalEvents.CONTACTS);
	},

	onAddressInput: (event) => {
		const target = event.target as HTMLInputElement;
		events.emit<Pick<IOrderChange, 'address'>>(CheckoutEvent.ADDRESS_INPUT, { address: target.value });
	},
});

const contacts = new ContactsView(cloneTemplate(contactsTemplate), {
	onEmailInput: (event) => {
		const target = event.target as HTMLInputElement;
		events.emit<Pick<IContactsChange, 'email'>>(CheckoutEvent.EMAIL_INPUT, { email: target.value });
	},
	onPhoneInput: (event) => {
		const target = event.target as HTMLInputElement;
		events.emit<Pick<IContactsChange, 'phone'>>(CheckoutEvent.PHONE_INPUT, {phone: target.value });
	},
	onToPayButtonClick: (event) => {
		event.preventDefault();
		api
			.orderProducts({
				items: basketModel.getProducts().map((product) => product.id),
				total: basketModel.getTotal(),
				payment: orderModel.getPayment(),
				address: orderModel.getAddress(),
				email: contactModel.getEmail(),
				phone: contactModel.getPhone(),
			})
			.then(() => {
				successModel.setTotal(basketModel.getTotal());
				basketModel.clear();
				events.emit(ModalEvents.SUCCESS);
			})
			.catch((error) => {
				console.error(error);
			});
	},
});

const success = new SuccessView(cloneTemplate(successTemplate), {
	onSuccessButtonClick: (event) => {
		event.preventDefault();
		events.emit(ModalEvents.NONE);
	},
});

let productCardPreview: CardPreviewView;
let productCardPreviewProduct: IProduct;

events.on(CatalogEvents.CHANGED, (products: IProduct[]) => {
	const content = products.map((product) => {
		const card = new CardPreviewView(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit(ModalEvents.PRODUCT_PREVIEW, product)
		});

		return card.render({
			id: product.id,
			category: product.category,
			title: product.title,
			image: product.image,
			price: product.price,
		});
	});
	
	page.render({ catalog: content });
});

events.on(ModalEvents.PRODUCT_PREVIEW, (product: IProduct) => {
	productCardPreview = new CardPreviewView(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit(BasketEvents.ADD, product)
	});

	productCardPreviewProduct = product;

	modal.render({
		content: productCardPreview.render({
			id: product.id,
			category: product.category,
			title: product.title,
			image: product.image,
			description: product.description,
			price: product.price,
			isInBasket: basketModel.isAddedToBasket(product),
		}),
	});

	modalModel.open();
});

events.on(ModalEvents.BASKET, () => {
	modal.render({ content: basket.render({}) });
	modalModel.open();
});

events.on(ModalEvents.ORDER, () => {
	modal.render({ content: order.render({}) });
	modalModel.open();
});

events.on(ModalEvents.CONTACTS, () => {
	modal.render({ content: contacts.render({}) });
	modalModel.open();
});

events.on(ModalEvents.SUCCESS, () => {
	modal.render({ content: success.render({}) });
	modalModel.open();
});

events.on(ModalEvents.NONE, () => {
	modalModel.close();
});

events.on(ModalEvents.OPEN, () => {
	page.render({ locked: true });
	modal.open();
});

events.on(ModalEvents.CLOSE, () => {
	page.render({ locked: false });
	modal.close();
});

events.on(BasketEvents.ADD, (product: IProduct) => {
	basketModel.add(product);
});

events.on(BasketEvents.REMOVE, (product: IProduct) => {
	basketModel.remove(product);
});

events.on(BasketEvents.CLEAR, () => {
	basketModel.clear();
});

events.on(BasketEvents.CHANGED, (data: IBasket) => {
	page.render({
		counter: data.products.length,
	})
});

events.on(BasketEvents.CHANGED, () => {
	if (productCardPreview !== undefined) {
		productCardPreview.render({
			isInBasket: basketModel.isAddedToBasket(productCardPreviewProduct),
		});
	}
});

events.on(BasketEvents.CHANGED, (data: IBasket) => {
	const cardBasketItems = data.products.map((product, index) => {
		const cardBasket = new CardBasketView(cloneTemplate(cardBasketTemplate), {
			onCardButtonDeleteClick: () => events.emit(BasketEvents.REMOVE, product),
		});

		return cardBasket.render({
			index: index + 1,
			title: product.title,
			price: product.price,
		});
	});

	basket.render({
		items: cardBasketItems,
		total: data.total,
	});
});

events.on(CheckoutEvent.PAYMENT_SELECT, (data: Pick<IOrderChange, 'payment'>) => {
		orderModel.setPayment(data.payment);
	}
);

events.on(CheckoutEvent.ADDRESS_INPUT, (data: Pick<IOrderChange, 'address'>) => {
		orderModel.setAddress(data.address);
	}
);

events.on(OrderEvent.ORDER_CHANGED, (data: IOrderChange) => {
	order.render({
		payment: data.payment,
		address: data.address,
		valid: data.isValid,
		error: data.error,
	});
});

events.on(ContactsEvent.CONTACTS_CHANGED, (data: IContactsChange) => {
	contacts.render({
		email: data.email,
		phone: data.phone,
		valid: data.isValid,
		error: data.error,
	});
});

events.on(CheckoutEvent.EMAIL_INPUT, (data: Pick<IContactsChange, 'email'>) => {
	contactModel.setEmail(data.email);
});

events.on(CheckoutEvent.PHONE_INPUT, (data: Pick<IContactsChange, 'phone'>) => {
	contactModel.setPhone(data.phone);
});

events.on(SuccessEvent.CHANGED, (data: ISuccess) => {
	success.render({ total: data.total })
});
