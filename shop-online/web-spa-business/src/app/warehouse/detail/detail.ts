import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { Warehouse, WarehouseService } from '../shared/index';
import { AlertType } from './../../shared/index';
import { EditController } from './../../shared/index';

@Component({
    selector: 'warehouse-detail',
    templateUrl: 'src/app/warehouse/detail/detail.html'
})

export class WarehouseDetailCmp extends EditController<Warehouse> implements OnInit {
    constructor(
        route: ActivatedRoute,
        router: Router,
        translate: TranslateService,
        private warehouseService: WarehouseService) {
        super(route, router, translate);
    }

    getCurrentUrl(): string {
        return '/warehouse-detail';
    }

    createModel(): Warehouse {
        return new Warehouse();
    }

    load(id: any): Warehouse {
        return this.warehouseService.getWarehouse(id);
    }

    validate(model: Warehouse): boolean {
        // TODO: validate warehouse here

        // call this.addError(field, message) if has any error

        return true;
    }

    save(model: Warehouse): boolean {
        return this.warehouseService.saveWarehouse(model, this.isEditing);
    }
}