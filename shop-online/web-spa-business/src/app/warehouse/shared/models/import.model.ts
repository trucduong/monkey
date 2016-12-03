import {BaseModel} from '../../../shared/index';
import {Product} from '../../../product/shared/index';

export class ImportModel extends BaseModel {
    id: string;
    importNo: string;
    importDate: Date;
    warehouse: string;
    supplier: string;
    products: Product[];

    constructor() {
        super();
    }
}