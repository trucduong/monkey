export class Customer {
  id: string;
  name: string;
  phone: string;
  customerGroup: string;
  address: string;
  email: string;
  sex: string;
  birthDay: string;
  note: string;
  revenure: string;
  times: string;
  balanceDue: string;

  constructor(id?: string, name?: string,phone?: string,customerGroup?: string,address?: string,email?: string,sex?: string,birthDay?: string,note?: string,revenure?: string,times?: string,balanceDue?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = '-1';
    }
    this.name = name;
    this.phone = phone;
    this.customerGroup = customerGroup;
    this.address = address;
    this.email = email;
    this.sex = sex;
    this.birthDay = birthDay;
    this.note = note;
    this.revenure = revenure;
    this.times = times;
    this.balanceDue = balanceDue;
  }
}