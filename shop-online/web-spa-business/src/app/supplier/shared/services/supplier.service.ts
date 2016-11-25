import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';
import { SupplierGroup } from '../models/supplier.group'
import {Supplier} from '../models/supplier'

@Injectable()
export class SupplierService extends BaseHttpService {
    constructor(http: Http) {
        super(http);
     }

    /**
     * Supplier
     */
    getSuppliers() {
        return this.get(SERVICES.URLS.supplier, SERVICES.ACTIONS.READ_ALL, []);
    }

    getSupplier(id: string) {
        return this.get(SERVICES.URLS.supplier, SERVICES.ACTIONS.READ, [id]);
    }

    saveSupplier(item: Supplier, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.supplier, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.supplier, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteSupplier(id: string) {
        return this.post(SERVICES.URLS.supplier, SERVICES.ACTIONS.DELETE, {}, [id]);
    }

    /**
     * Supplier Group
     */
    getSupplierGroups() {
        return this.get(SERVICES.URLS.supplier_group, SERVICES.ACTIONS.READ_ALL, []);
    }

    getSupplierGroup(id: string) {
        return this.get(SERVICES.URLS.supplier_group, SERVICES.ACTIONS.READ, [id]);
    }

    saveSupplierGroup(item: SupplierGroup, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.supplier_group, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.supplier_group, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteSupplierGroup(id: string) {
        return this.post(SERVICES.URLS.supplier_group, SERVICES.ACTIONS.DELETE, {}, [id]);
    }
}