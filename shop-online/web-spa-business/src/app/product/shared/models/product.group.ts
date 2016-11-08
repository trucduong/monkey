export class ProductGroup {
  id: string;
  name: string;
  description: string;

  constructor(id?: string, name?: string, description?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.description = description;

  }
}