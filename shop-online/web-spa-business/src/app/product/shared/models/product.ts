import { BaseModel } from '../../../shared/index';

export class Product extends BaseModel {
  id: string;
  code: string;
  name: string;
  image: string;
  unit: string;
  groupId: string;
  groupName: string;
  description: string;
  status: string;
  discount: number;
  remaining: number;
  warningRemaining: number;
  inputPrice: number;
  wholesalePrice: number;
  retailPrice: number;

  constructor() {
    super();
    this.id = '-1';
  }

  getId(): any {
    return this.id;
  }
}