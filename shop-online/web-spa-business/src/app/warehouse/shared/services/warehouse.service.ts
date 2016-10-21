import { Injectable } from '@angular/core';


import {Warehouse} from '../models/warehouse'
import {WAREHOUSES} from  './warehouse.data';


@Injectable()
export class WarehouseService {
    constructor() { }


    // warehouse
       
    getWarehouses(): any {
        let list: Warehouse[] = [];
        WAREHOUSES.forEach(element => {
            list.push(element);
        });

        return list;
    }

    getWarehousesByName(name: string): any {
        let list: Warehouse[] = [];
        WAREHOUSES.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getWarehouse(id: string): any {
        let warehouse: Warehouse;
        WAREHOUSES.forEach(element => {
            if (element.id == id) {
                warehouse = element;
                return;
            }
        });
        return warehouse;
    }

    saveWarehouse(item: Warehouse, isEditing: boolean): boolean {
        if (isEditing) {
            WAREHOUSES.forEach(element => {
                if (element.id == item.id) {
                    element.name = item.name;
                    element.address = item.address;
                    element.phone = item.phone;
                    element.status == item.status;
                    element.use = item.use;
                    element.branch = item.branch;
                    element.note = item.note;
           
                    
                    return;
                }
            });
        } else {
            WAREHOUSES.push(item);
        }

        return true;
    }

    deleteWarehouse(id: string): boolean {
        let warehouse: Warehouse;
        WAREHOUSES.forEach(function(element, index) {
            if (element.id == id) {
               WAREHOUSES.splice(index, 1);
                
                return;
            }
        });

        return true;
    }

}