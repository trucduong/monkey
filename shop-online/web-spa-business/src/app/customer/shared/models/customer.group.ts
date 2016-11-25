import { BaseModel } from '../../../shared/index';

export class CustomerGroup extends BaseModel {
  id: string;
  name: string;
  description: string;

  constructor() {
    super();
    this.id = '-1';
  }
}