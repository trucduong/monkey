import { BaseModel } from '../../../shared/index';

export class SupplierGroup extends BaseModel {
  id: string;
  name: string;
  description: string;

  constructor() {
    super();
    this.id = '-1';
  }
}