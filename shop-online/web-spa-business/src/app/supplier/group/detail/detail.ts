import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { SupplierService, SupplierGroup } from '../../shared/index';
import { AlertType } from '../../../shared/index';
import { EditController } from '../../../shared/index';

@Component({
    selector: 'supplier-group-detail',
    templateUrl: 'src/app/supplier/group/detail/detail.html'
})

export class SupplierGroupDetailCmp extends EditController<SupplierGroup> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private supplierService: SupplierService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/supplier-group-detail';
    }

    createModel(): SupplierGroup {
        return new SupplierGroup();
    }

    // load(id: any): SupplierGroup {
    //     return this.supplierService.getSupplierGroup(id);
    // }

    validate(model: SupplierGroup): boolean {
        // TODO: validate supplier group here

        // call this.addError(field, message) if has any error

        return true;
    }

    // save(model: SupplierGroup): boolean {
    //     return this.supplierService.saveSupplierGroup(model, this.isEditing);
    // }
}