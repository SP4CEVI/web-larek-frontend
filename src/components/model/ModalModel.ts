import { Model } from '../base/Model';

export enum ModalEvents {
	PRODUCT_PREVIEW = 'modal:productPreview',
	BASKET = 'modal:basket',
	ORDER = 'modal:order',
	CONTACTS = 'modal:contacts',
	SUCCESS = 'modal:success',

	OPEN = 'modal:open',
	CLOSE = 'modal:close',
	NONE = 'modal:none',
}

export class ModalModel extends Model {
	open(): void { this.emitChanges(ModalEvents.OPEN); }

	close(): void { this.emitChanges(ModalEvents.CLOSE); }
}