import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListInputController, GridInputHeader, SortInfo, FilterInfo, DialogInfo, DialogService } from '../../shared/index';
import { Warehouse, WarehouseService } from '../shared/index';

const headers: GridInputHeader[] = [
  { name: 'name', labelKey: 'warehouse.list.name', sortable: true, width: 30, translation: false, inputable: true },
  { name: 'address', labelKey: 'common.list.address', sortable: true, width: 20, translation: false, inputable: true },
  { name: 'phone', labelKey: 'common.list.phone', sortable: true, width: 10, translation: false, inputable: false },
  { name: 'status', labelKey: 'common.list.status', sortable: true, width: 10, translation: false, inputable: false },
  { name: 'use', labelKey: 'warehouse.list.use', sortable: true, width: 10, translation: false, inputable: false },
  { name: 'branch', labelKey: 'warehouse.list.branch', sortable: true, width: 10, translation: false, inputable: false },
  { name: 'note', labelKey: 'common.list.note', sortable: true, width: 10, translation: false, inputable: false },

];

@Component({
  selector: 'warehouse-export',
  templateUrl: 'src/app/warehouse/export/export.html'
})

export class WarehouseExportCmp extends ListInputController<Warehouse> implements OnInit {

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService,
    private dialogService: DialogService) {

    super(route, translate, router);
  }

  getHeaders(): GridInputHeader[] {
    return headers;
  }

  getDefaultSort(): SortInfo {
    return new SortInfo('name', 'asc');
  }

  load(): Promise<Warehouse[]> {
    return Promise.resolve([]);
  }

  getCurrentUrl(): string {
    return '/warehouse-export';
  }

  execute(param: any) { 
    if (param.action == 'add') {
      this.dataSource.push(new Warehouse('x','','','0123456789','active','','',''));
      let newdata = this.dataSource;
      this.dataSource = [];
      this.dataSource = newdata;
    }
  }
}