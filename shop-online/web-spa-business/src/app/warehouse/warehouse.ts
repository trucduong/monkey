import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridHeader, SortInfo, FilterInfo } from './../shared/index';
import { Warehouse } from './shared/index';
import { WarehouseService} from './shared/index';

const headers: GridHeader[] = [
  { name: 'id', labelKey: 'warehouse.list.id', sortable: true, width: 10},
  { name: 'name', labelKey: 'warehouse.list.name', sortable: true, width: 10},
  { name: 'address', labelKey: 'common.list.address', sortable: true, width: 10},
  { name: 'phone', labelKey: 'common.list.phone', sortable: true, width: 10},
  { name: 'status', labelKey: 'common.list.status', sortable: true, width: 10},
  { name: 'use', labelKey: 'warehouse.list.use', sortable: true, width: 10},
  { name: 'branch', labelKey: 'warehouse.list.branch', sortable: true, width: 10},
  { name: 'note', labelKey: 'common.list.note', sortable: true, width: 10},

];

@Component({
  selector: 'warehouse',
  templateUrl: 'src/app/warehouse/warehouse.html'
})

export class WarehouseCmp extends ListController<Warehouse> implements OnInit  {
    constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {

      super(route, translate, router);
    }

  getHeaders(): GridHeader[] {
    return headers;
  }

  getDefaultSort(): SortInfo {
    return new SortInfo('name', 'asc');
  }

  getDefaultFilter(): FilterInfo {
    return new FilterInfo(['name', 'note']);
  }

  load(): Promise<Warehouse[]> {
    return Promise.resolve(this.warehouseService.getWarehouses());
  }

  getCurrentUrl(): string {
    return '/warehouse';
  }

  getDetailUrl(): string {
    return '/warehouse-detail';
  }


}