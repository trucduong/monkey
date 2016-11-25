import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';
import {Employee} from '../models/employee'

@Injectable()
export class EmployeeService extends BaseHttpService {
    constructor(http: Http) {
        super(http);
     }

    /**
     * Employee
     */
    getEmployees() {
        return this.get(SERVICES.URLS.employee, SERVICES.ACTIONS.READ_ALL, []);
    }

    getEmployee(id: string) {
        return this.get(SERVICES.URLS.employee, SERVICES.ACTIONS.READ, [id]);
    }

    saveEmployee(item: Employee, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.employee, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.employee, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteEmployee(id: string) {
        return this.post(SERVICES.URLS.employee, SERVICES.ACTIONS.DELETE, {}, [id]);
    }

    /**
     * Employee detail
     */
    getEmployeeWithDetails() {
        return this.get(SERVICES.URLS.employee, SERVICES.ACTIONS.READ_ALL_D, []);
    }

    saveEmployeeDetail(item: Employee) {
        return this.post(SERVICES.URLS.employee, SERVICES.ACTIONS.UPDATE_D, item, [item.id]);
    }

}