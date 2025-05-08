import { Model } from '../base/Model';
import { ModalEvents } from '../events/ModalEvents';

export class ModalModel extends Model {
	open(): void { this.emitChanges(ModalEvents.OPEN); }

	close(): void { this.emitChanges(ModalEvents.CLOSE); }
}