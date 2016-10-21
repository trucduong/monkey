export class WarehouseInput {
  id: string;
  name: string;
  unit: string;
  quantity: string;
  inputPrice: string;
  wholesalePrice: string;
  retailPrice: string;
  total: string;
  note: string;
  

  constructor(id?: string, name?: string,unit?: string,quantity?:string, inputPrice?: string, wholesalePrice?: string, retailPrice?:string, total?:string, note?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.unit = unit;
    this.quantity = quantity;
    this.inputPrice = inputPrice;
    this.wholesalePrice = wholesalePrice;
    this.retailPrice = retailPrice;
    this.total = total;
    this.note = note;
  }
}