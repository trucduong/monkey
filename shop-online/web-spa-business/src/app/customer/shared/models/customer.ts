import { BaseModel } from '../../../shared/index';

export class Customer extends BaseModel {
  id: string;
  name: string;
  phone: string;
  group: string;
  sex: string;
  email: string;
  addressDetail: string;
  address1: string;
  address2: string;
  address3: string;
  description: string;

  constructor() {
    super();
    this.id = '-1';
  }
}