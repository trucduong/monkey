import { BaseModel } from '../../../shared/index';

export class Supplier extends BaseModel {
  id: string;
  name: string;
  phone: string;
  groupId: string;
  groupName: string;
  email: string;
  address: string;
  description: string;

  constructor() {
    super();
    this.id = '-1';
  }
}