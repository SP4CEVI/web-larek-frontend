import { Model } from '../base/Model';

export interface ISuccess {
	total: number;
}

export enum SuccessEvent {
	CHANGED = 'success:changed',
}

export class SuccessModel extends Model {
	protected total = 0;

	setTotal(total: number) {
		this.total = total;
		this.emitChanges(SuccessEvent.CHANGED, {
			total: total,
		} as ISuccess);
	}
}