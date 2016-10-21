import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { CustomerService, CustomerGroup } from '../../shared/index';
import { AlertType } from '../../../shared/index';
import { EditController } from '../../../shared/index';

@Component({
    selector: 'customer-group-detail',
    templateUrl: 'src/app/customer/group/detail/detail.html'
})

export class CustomerGroupDetailCmp extends EditController<CustomerGroup> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private customerService: CustomerService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/customer-group-detail';
    }

    createModel(): CustomerGroup {
        return new CustomerGroup();
    }

    load(id: any): CustomerGroup {
        return this.customerService.getCustomerGroup(id);
    }

    validate(model: CustomerGroup): boolean {
        // TODO: validate customer group here

        // call this.addError(field, message) if has any error

        return true;
    }

    save(model: CustomerGroup): boolean {
        return this.customerService.saveCustomerGroup(model, this.isEditing);
    }
}