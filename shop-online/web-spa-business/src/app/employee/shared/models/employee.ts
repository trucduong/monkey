import { BaseModel } from '../../../shared/index';

export class Employee extends BaseModel {
  id: string;
  name: string;
  title: string;
  phone: string;
  sex: string;
  email: string;
  birthDate: Date;
  workingStatus: string;
  addressDetail: string;
  address1: string;
  address2: string;
  address3: string;

  joinDate: Date;
  faceAmount: number;

  constructor() {
    super();
    this.id = '-1';
  }
}