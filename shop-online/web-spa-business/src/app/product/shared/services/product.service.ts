import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';

import { ProductGroup } from '../models/product.group'
import {PRODUCT_GROUPS} from './product.data';

import {Product} from '../models/product'
import {PRODUCTS} from  './product.data';

import {Unit} from '../models/unit'
import {UNITS} from  './product.data';

@Injectable()
export class ProductService extends BaseHttpService {
    constructor(http: Http) { 
        super(http);
    }

    // Group
    getProductGroups(): any {
        let list: ProductGroup[] = [];
        PRODUCT_GROUPS.forEach(element => {
            list.push(element);
        });

        return list;
    }

    getProductGroupsByName(name: string): any {
        let list: ProductGroup[] = [];
        PRODUCT_GROUPS.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getProductGroup(id: string): any {
        let product: ProductGroup;
        PRODUCT_GROUPS.forEach(element => {
            if (element.id == id) {
                product = element;
                return;
            }
        });
        return product;
    }

    saveProductGroup(item: ProductGroup, isEditing: boolean): boolean {
        if (isEditing) {
            PRODUCT_GROUPS.forEach(element => {
                if (element.id == item.id) {
                    element.name = item.name;
                    element.description = item.description;
                    element.status = item.status;
                    
                    return;
                }
            });
        } else {
            PRODUCT_GROUPS.push(item);
        }

        return true;
    }

    deleteProductGroup(id: string): boolean {
        let productGroup: ProductGroup;
        PRODUCT_GROUPS.forEach(function(element, index) {
            if (element.id == id) {
                PRODUCT_GROUPS.splice(index, 1);
                
                return;
            }
        });

        return true;
    }
    
    getProducts() {
        return this.get(SERVICES.URLS.product, SERVICES.ACTIONS.READ_ALL, []);
    }

    getProductsByName(name: string): any {
        let list: Product[] = [];
        PRODUCTS.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getProduct(id: string) {
        return this.get(SERVICES.URLS.product, SERVICES.ACTIONS.READ_BY, ['id', id]);
    }

    saveProduct(item: Product, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.product, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.product, SERVICES.ACTIONS.CREATE, item, [item.id])
        }
    }

    deleteProduct(id: string) {
        return this.post(SERVICES.URLS.product, SERVICES.ACTIONS.DELETE, {}, [id]);
    }


    //unit
      getUnits(): any {
        let list: Unit[] = [];
        UNITS.forEach(element => {
            list.push(element);
        });

        return list;
    }

    getUnitsByName(name: string): any {
        let list: Unit[] = [];
        UNITS.forEach(element => {
            if (element.name.indexOf(name) != -1) {
                list.push(element);
            }
        });

        return list;
    }

    getUnit(id: string): any {
        let unit: Unit;
       UNITS.forEach(element => {
            if (element.id == id) {
                unit = element;
                return;
            }
        });
        return unit;
    }

    saveUnit(item: Unit, isEditing: boolean): boolean {
        if (isEditing) {
            UNITS.forEach(element => {
                if (element.id == item.id) {
                    element.name = item.name;
                    element.description = item.description;
                    
                    return;
                }
            });
        } else {
            UNITS.push(item);
        }

        return true;
    }

    deleteUnit(id: string): boolean {
        let unit: Unit;
        UNITS.forEach(function(element, index) {
            if (element.id == id) {
                UNITS.splice(index, 1);
                
                return;
            }
        });

        return true;
    }

}