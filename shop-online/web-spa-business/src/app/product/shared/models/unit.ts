import { BaseModel } from '../../../shared/index';

export class Unit extends BaseModel {
  id: string;
  name: string;
  description: string;


  constructor(id?: string, name?: string, description?: string) {
    super();

    this.id = id;
    this.name = name;
    this.description = description;
  }

  getId() {
    return this.id;
  }
}