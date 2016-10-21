export class SupplierGroup {
  id: string;
  name: string;
  note: string;
  quantity: string;

  constructor(id?: string, name?: string, note?: string, quantity?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.note = note;
    this.quantity = quantity;
  }
}