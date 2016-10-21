import { Injectable } from '@angular/core';

import { SupplierGroup } from '../models/supplier.group'
import {SUPPLIER_GROUPS} from './supplier.data';

import {Supplier} from '../models/supplier'
import {SUPPLIERS} from  './supplier.data';


@Injectable()
export class SupplierService {
    constructor() { }

    // Group
    getSupplierGroups(): any {
        let list: SupplierGroup[] = [];
        SUPPLIER_GROUPS.forEach(element => {
            list.push(element);
        });

        return list;
    }

    getSupplierGroupsByName(name: string): any {
        let list: SupplierGroup[] = [];
        SUPPLIER_GROUPS.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getSupplierGroup(id: string): any {
        let supplier: SupplierGroup;
        SUPPLIER_GROUPS.forEach(element => {
            if (element.id == id) {
                supplier = element;
                return;
            }
        });
        return supplier;
    }

    saveSupplierGroup(item: SupplierGroup, isEditing: boolean): boolean {
        if (isEditing) {
            SUPPLIER_GROUPS.forEach(element => {
                if (element.id == item.id) {
                    element.name = item.name;
                    element.note = item.note;
                    element.quantity = item.quantity;
                    
                    return;
                }
            });
        } else {
            SUPPLIER_GROUPS.push(item);
        }

        return true;
    }

    deleteSupplierGroup(id: string): boolean {
        let supplierGroup: SupplierGroup;
        SUPPLIER_GROUPS.forEach(function(element, index) {
            if (element.id == id) {
                SUPPLIER_GROUPS.splice(index, 1);
                
                return;
            }
        });

        return true;
    }


    // supplier
       
    getSuppliers(): any {
        let list: Supplier[] = [];
        SUPPLIERS.forEach(element => {
            list.push(element);
        });

        return list;
    }

    getSuppliersByName(name: string): any {
        let list: Supplier[] = [];
        SUPPLIERS.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getSupplier(id: string): any {
        let supplier: Supplier;
        SUPPLIERS.forEach(element => {
            if (element.id == id) {
                supplier = element;
                return;
            }
        });
        return supplier;
    }

    saveSupplier(item: Supplier, isEditing: boolean): boolean {
        if (isEditing) {
            SUPPLIERS.forEach(element => {
                if (element.id == item.id) {
                    element.name = item.name;
                    element.address = item.address;
                    element.contact = item.contact;
                    element.phone == item.phone;
                    element.email = item.email;
                    element.fax = item.fax;
                    element.birthDay = item.birthDay;
                    element.supplierGroup = item.supplierGroup;
                    element.note = item.note;
           
                    
                    return;
                }
            });
        } else {
            SUPPLIERS.push(item);
        }

        return true;
    }

    deleteSupplier(id: string): boolean {
        let supplier: Supplier;
        SUPPLIERS.forEach(function(element, index) {
            if (element.id == id) {
                SUPPLIERS.splice(index, 1);
                
                return;
            }
        });

        return true;
    }

}