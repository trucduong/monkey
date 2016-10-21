export class ProductGroup {
  id: string;
  name: string;
  description: string;
  status: string;

  constructor(id?: string, name?: string, description?: string, status?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.status = status;
    this.description = description;

  }
}