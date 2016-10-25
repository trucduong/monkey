import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { ProductService, Unit} from '../../shared/index';
import { AlertType } from '../../../shared/index';
import { EditController } from '../../../shared/index';

@Component({
    selector: 'product-unit-detail',
    templateUrl: 'src/app/product/unit/detail/detail.html'
})

export class UnitDetailCmp extends EditController<Unit> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private unitService: ProductService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/product-unit-detail';
    }

    createModel(): Unit {
        return new Unit();
    }

    // load(id: any): Unit {
    //     return this.unitService.getUnit(id);
    // }

    validate(model: Unit): boolean {
        // TODO: validate unit group here

        // call this.addError(field, message) if has any error

        return true;
    }

    // save(model: Unit): boolean {
    //     return this.unitService.saveUnit(model, this.isEditing);
    // }
}