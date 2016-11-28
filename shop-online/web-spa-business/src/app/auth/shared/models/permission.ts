import { BaseModel } from '../../../shared/index';

export class Permission extends BaseModel {
    name: string;
	groupName: string;
	displayName: string;
	description: string;
	status: string;

    selected: boolean;

    constructor() {
        super();
    }
}
