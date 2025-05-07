import { IEvents } from './Events';

export abstract class Model {
	constructor(private events: IEvents) {}

	protected emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
