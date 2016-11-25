import { BaseModel } from '../../../shared/index';

export class Shop extends BaseModel {
    id: string;
    name: string;
    phone: string;
    email: string;
    taxCode: string;
    ownerId: string;
    ownerName: string;

    constructor() {
        super();
    }
}