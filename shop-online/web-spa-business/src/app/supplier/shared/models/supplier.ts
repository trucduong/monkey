import { BaseModel } from '../../../shared/index';

export class Supplier extends BaseModel {
  id: string;
  name: string;
  phone: string;
  group: string;
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