import { BaseModel } from '../../../shared/index';

export class CustomerGroup extends BaseModel {
  id: string;
  name: string;
  note: string;
  quantity: string;

  constructor(id?: string, name?: string, note?: string, quantity?: string) {
    super();

    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.note = note;
    this.quantity = quantity;

  }

  getId() {
    return this.id;
  }
}