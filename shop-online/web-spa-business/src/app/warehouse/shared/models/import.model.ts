import {BaseModel} from '../../../shared/index';
import {Product} from '../../../product/shared/index';

export class ImportModel extends BaseModel {

    id: string;
    warehouseId: string;
    referenceNo: string;
    historyDateTime: Date;
    supplier: string;
    employeeId: string;
    details: Product[];

    constructor() {
        super();
    }
}

export class ImportHistory extends BaseModel {
    warehouse: string;
	referenceNo: string;
	historyDateTime: Date;
	historyType: string;
	supplier: string;
	customer: string;
	employee: string;
	product: string;
	remaining: number;
	inputPrice:number;
	wholesalePrice: number;
	retailPrice: number;

    constructor() {
        super();
    }

    // public static convertFrom(models:ImportModel[]): ImportHistory[] {
    //     let histories: ImportHistory[] = [];
    //     models.forEach(model => {
    //         model.details.forEach(detail => {
    //             let history = new ImportHistory();
    //             history.employeeId = model.employeeId;
    //             history.inputPrice = detail.inputPrice;
    //             history.productId = detail.id;
    //             history.referenceNo = model.referenceNo;
    //             history.remaining = detail.remaining;
    //             history.retailPrice = detail.retailPrice;
    //             history.supplier = model.supplier;
    //             history.warehouseId = model.warehouseId;
    //             history.wholesalePrice = detail.wholesalePrice;
    //             history.historyDateTime = model.historyDateTime;

    //             histories.push(history);
    //         });
    //     });

    //     return histories;
    // }
}