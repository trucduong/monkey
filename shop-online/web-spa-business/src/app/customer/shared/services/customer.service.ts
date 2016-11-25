import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';
import { CustomerGroup } from '../models/customer.group'
import {Customer} from '../models/customer'

@Injectable()
export class CustomerService extends BaseHttpService {
    constructor(http: Http) {
        super(http);
     }

    /**
     * Customer
     */
    getCustomers() {
        return this.get(SERVICES.URLS.customer, SERVICES.ACTIONS.READ_ALL, []);
    }

    getCustomer(id: string) {
        return this.get(SERVICES.URLS.customer, SERVICES.ACTIONS.READ, [id]);
    }

    saveCustomer(item: Customer, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.customer, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.customer, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteCustomer(id: string) {
        return this.post(SERVICES.URLS.customer, SERVICES.ACTIONS.DELETE, {}, [id]);
    }

    /**
     * Customer Group
     */
    getCustomerGroups() {
        return this.get(SERVICES.URLS.customer_group, SERVICES.ACTIONS.READ_ALL, []);
    }

    getCustomerGroup(id: string) {
        return this.get(SERVICES.URLS.customer_group, SERVICES.ACTIONS.READ, [id]);
    }

    saveCustomerGroup(item: CustomerGroup, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.customer_group, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.customer_group, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteCustomerGroup(id: string) {
        return this.post(SERVICES.URLS.customer_group, SERVICES.ACTIONS.DELETE, {}, [id]);
    }
}