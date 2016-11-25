import { BaseModel } from '../../../shared/index';

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