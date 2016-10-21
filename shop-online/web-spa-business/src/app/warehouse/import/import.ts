import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridHeader, SortInfo, FilterInfo, DialogInfo, DialogService } from '../../shared/index';
import { Warehouse, WarehouseService } from '../shared/index';

const headers: GridHeader[] = [
  { name: 'id', labelKey: 'warehouse.list.id', sortable: true, width: 10, translation: false },
  { name: 'name', labelKey: 'warehouse.list.name', sortable: true, width: 10, translation: false },
  { name: 'address', labelKey: 'common.list.address', sortable: true, width: 10, translation: false },
  { name: 'phone', labelKey: 'common.list.phone', sortable: true, width: 10, translation: false },
  { name: 'status', labelKey: 'common.list.status', sortable: true, width: 10, translation: false },
  { name: 'use', labelKey: 'warehouse.list.use', sortable: true, width: 10, translation: false },
  { name: 'branch', labelKey: 'warehouse.list.branch', sortable: true, width: 10, translation: false },
  { name: 'note', labelKey: 'common.list.note', sortable: true, width: 10, translation: false },

];

@Component({
  selector: 'warehouse-import',
  templateUrl: 'src/app/warehouse/import/import.html'
})

export class WarehouseImportCmp extends ListController<Warehouse> implements OnInit {

  private dialogInfo: DialogInfo;
  // TODO: private item: ImportProduct

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService,
    private dialogService: DialogService) {

    super(route, translate, router);
    this.dialogInfo = new DialogInfo();
  }

  getHeaders(): GridHeader[] {
    return headers;
  }

  getDefaultSort(): SortInfo {
    return new SortInfo('name', 'asc');
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

  onEdit(item: Warehouse) {
    // TODO: set data

    this.dialogService.show(this.dialogInfo);
  }

  onAdd() {
    // TODO: init data

    this.dialogService.show(this.dialogInfo);
  }

  delete(item: Warehouse): boolean {
    return this.warehouseService.deleteWarehouse(item.id);
  }

  onSave() {
    // TODO: Add new item

    // TODO: Init data for new Product
  }

  onDialogClose() {
    // TODO: check closeable conditions

    this.dialogService.hide(this.dialogInfo);
    this.onLoad();
  }
}