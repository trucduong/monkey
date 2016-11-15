import { BaseModel } from '../../../shared/index';

export class ProductGroup extends BaseModel {
  id: string;
  name: string;
  description: string;

  constructor(id?: string, name?: string, description?: string) {
    super();
    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.description = description;

  }

  getId() {
    return this.id;
  }
}