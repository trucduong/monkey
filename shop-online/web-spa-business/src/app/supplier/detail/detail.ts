import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Supplier, SupplierService } from '../shared/index';
import { AlertType } from './../../shared/index';
import { EditController } from './../../shared/index';

@Component({
    selector: 'supplier-detail',
    templateUrl: 'src/app/supplier/detail/detail.html'
})

export class SupplierDetailCmp extends EditController<Supplier> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private supplierService: SupplierService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/supplier-detail';
    }

    createModel(): Supplier {
        return new Supplier();
    }

    load(id: any): Supplier {
        return this.supplierService.getSupplier(id);
    }

    validate(model: Supplier): boolean {
        // TODO: validate supplier here

        // call this.addError(field, message) if has any error

        return true;
    }

    save(model: Supplier): boolean {
        return this.supplierService.saveSupplier(model, this.isEditing);
    }
}