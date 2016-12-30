import { BaseModel } from '../../../shared/index';
import {Product} from '../../../product/shared/index';

export class Warehouse extends BaseModel {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  phone: string;
  status: string;
  address: string;


  constructor() {
    super();
    this.id = '-1';
  }
}


export class WareHouseSearchCondition extends BaseModel {
    referenceNo: string;
    historyDateTime: Date;
    warehouseId: string;
    supplierId: string;
    employeeId: string;
    customerId: string;
    productId: string;

    constructor() {
        super();
    }
}

export class WarehouseModel extends BaseModel {

    id: string;
    warehouseId: string;
    warehouseName: string;
    warehouseId1: string;
    warehouseName1: string;
    referenceNo: string;
    historyDateTime: Date;
    supplierId: string;
    supplierName: string;
    customerId: string;
    customerName: string;
    employeeId: string;
    employeeName: string;
    description: string;
    details: Product[];

    constructor() {
        super();
    }
}

export class WarehouseHistory extends BaseModel {
    warehouse: string;
    warehouse1: string;
    referenceNo: string;
    historyDateTime: Date;
    historyType: string;
    supplier: string;
    customer: string;
    employee: string;
    product: string;
    remaining: number;
    inputPrice: number;
    wholesalePrice: number;
    retailPrice: number;
    description: string;

    constructor() {
        super();
    }
}
