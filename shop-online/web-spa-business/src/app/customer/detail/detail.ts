import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Customer, CustomerService } from '../shared/index';
import { EditController, AlertType, FormInfo } from './../../shared/index';

@Component({
    selector: 'customer-detail',
    templateUrl: 'src/app/customer/detail/detail.html'
})

export class CustomerDetailCmp extends EditController<Customer> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private customerService: CustomerService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/customer-detail';
    }

    // createForm(): FormInfo {
    //     let form = new FormInfo(this.createModel, 'customer.detail.title');
    //     return form;
    // }

    createModel(): Customer {
        return new Customer();
    }

    // load(id: any): Customer {
    //     return this.customerService.getCustomer(id);
    // }

    validate(model: Customer): boolean {
        // TODO: validate customer here

        // call this.addError(field, message) if has any error

        return true;
    }

    // save(model: Customer): Promise<boolean> {
    //     return Promise.resolve(this.customerService.saveCustomer(model, this.isEditing));
    // }
}