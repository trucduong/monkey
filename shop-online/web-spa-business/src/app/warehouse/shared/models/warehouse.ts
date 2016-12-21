import { BaseModel } from '../../../shared/index';
import {Product} from '../../../product/shared/index';

export class Warehouse extends BaseModel {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  status: string;
  addressDetail: string;
  address1: string;
  address2: string;
  address3: string;


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
    referenceNo: string;
    historyDateTime: Date;
    supplier: string;
    customer: string;
    employeeId: string;
    description: string;
    details: Product[];

    constructor() {
        super();
    }
}

export class WarehouseHistory extends BaseModel {
    warehouse: string;
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
