import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';

import { ProductGroup } from '../models/product.group'

import {Product} from '../models/product'

import {Unit} from '../models/unit'

@Injectable()
export class ProductService extends BaseHttpService {
    constructor(http: Http) { 
        super(http);
    }

    /**
     * Product Group
     */
    getProductGroups(): any {
        return this.get(SERVICES.URLS.product_group, SERVICES.ACTIONS.READ_ALL, []);
    }

    getProductGroup(id: string): any {
        return this.get(SERVICES.URLS.product_group, SERVICES.ACTIONS.READ, [id]);
    }

    saveProductGroup(item: ProductGroup, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.product_group, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.product_group, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteProductGroup(id: string) {
        return this.post(SERVICES.URLS.product_group, SERVICES.ACTIONS.DELETE, {}, [id]);
    }
    
    /**
     * Product
     */
    getProducts() {
        return this.get(SERVICES.URLS.product, SERVICES.ACTIONS.READ_ALL, []);
    }

    getProduct(id: string) {
        return this.get(SERVICES.URLS.product, SERVICES.ACTIONS.READ, [id]);
    }

    saveProduct(item: Product, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.product, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.product, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteProduct(id: string) {
        return this.post(SERVICES.URLS.product, SERVICES.ACTIONS.DELETE, {}, [id]);
    }
}