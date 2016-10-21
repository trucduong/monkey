export class Product {
  id: string;
  code: string;
  name: string;
  image: string;
  unit: string;
  group: string;
  description: string;
  status: string;
  discount: number;
  remaining: number;
  warningRemaining: number;
  inputPrice: number;
  wholesalePrice: number;
  retailPrice: number;

  constructor() {
    this.id = '-1';
  }
}