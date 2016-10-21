import { Injectable } from '@angular/core';

import { CustomerGroup } from '../models/customer.group'
import {CUSTOMER_GROUPS} from './customer.data';

import {Customer} from '../models/customer'
import {CUSTOMERS} from  './customer.data';


@Injectable()
export class CustomerService {
    constructor() { }

    // Group
    getCustomerGroups(): any {
        let list: CustomerGroup[] = [];
        CUSTOMER_GROUPS.forEach(element => {
            list.push(element);
        });

        return list;
    }

    getCustomerGroupsByName(name: string): any {
        let list: CustomerGroup[] = [];
        CUSTOMER_GROUPS.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getCustomerGroup(id: string): any {
        let customer: CustomerGroup;
        CUSTOMER_GROUPS.forEach(element => {
            if (element.id == id) {
                customer = element;
                return;
            }
        });
        return customer;
    }

    saveCustomerGroup(item: CustomerGroup, isEditing: boolean): boolean {
        if (isEditing) {
            CUSTOMER_GROUPS.forEach(element => {
                if (element.id == item.id) {
                    element.name = item.name;
                    element.note = item.note;
                    element.quantity = item.quantity;
                    
                    return;
                }
            });
        } else {
            CUSTOMER_GROUPS.push(item);
        }

        return true;
    }

    deleteCustomerGroup(id: string): boolean {
        let customerGroup: CustomerGroup;
        CUSTOMER_GROUPS.forEach(function(element, index) {
            if (element.id == id) {
                CUSTOMER_GROUPS.splice(index, 1);
                
                return;
            }
        });

        return true;
    }


    // Customer
       
    getCustomers(): any {
        let list: Customer[] = [];
        CUSTOMERS.forEach(element => {
            list.push(element);
        });

        return list;
    }

    getCustomersByName(name: string): any {
        let list: Customer[] = [];
        CUSTOMERS.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getCustomer(id: string): any {
        let customer: Customer;
        CUSTOMERS.forEach(element => {
            if (element.id == id) {
                customer = element;
                return;
            }
        });
        return customer;
    }

    saveCustomer(item: Customer, isEditing: boolean): boolean {
        if (isEditing) {
            CUSTOMERS.forEach(element => {
                if (element.id == item.id) {
                    element.phone == item.phone;
                    element.name = item.name;
                    element.customerGroup = item.customerGroup;
                    element.address = item.address;
                    element.email = item.email;
                    element.sex = item.sex;
                    element.birthDay = item.birthDay;
                    element.note = item.note;
                    element.revenure = item.revenure;
                    element.times = item.times;
                    element.balanceDue = item.balanceDue;
                    
                    return;
                }
            });
        } else {
            CUSTOMERS.push(item);
        }

        return true;
    }

    deleteCustomer(id: string): boolean {
        let customer: Customer;
        CUSTOMERS.forEach(function(element, index) {
            if (element.id == id) {
                CUSTOMERS.splice(index, 1);
                
                return;
            }
        });

        return true;
    }

}