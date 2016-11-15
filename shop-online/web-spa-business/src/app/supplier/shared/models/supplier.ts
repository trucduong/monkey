import { BaseModel } from '../../../shared/index';

export class Supplier extends BaseModel {
  id: string;
  name: string;
  address: string;
  contact: string;
  phone: string;
  supplierGroup: string;
  email: string;
  sex: string;
  birthDay: string;
  note: string;
  fax: string;

  constructor(id?: string, name?: string,address?: string,contact?:string, phone?: string,fax?:string, supplierGroup?: string,email?: string,birthDay?: string,note?: string) {
    super();

    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.address = address;
    this.contact = contact;
    this.phone = phone;
    this.supplierGroup = supplierGroup;
    this.fax = fax;
    this.email = email;
    this.birthDay = birthDay;
    this.note = note;
    
  }

  getId() {
    return this.id;
  }
}