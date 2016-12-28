import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, CmbFieldInfo, SmartCmbFieldInfo, NumberFieldInfo, EmailFieldInfo, DateFieldInfo,
  CMB_FILTERS, ComboboxService, RefComboboxService } from './../shared/index';
import { Warehouse, WarehouseService } from './shared/index';

import { RefEmployeeService } from '../employee/index';

@Component({
  selector: 'warehouse',
  templateUrl: 'src/app/warehouse/warehouse.html'
})

export class WarehouseCmp extends SmartListController<Warehouse> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {

    super(route, translate, router);

    // TODO: move to sidebar menu
    this.resetNavigation();
  }

  getCurrentUrl(): string {
    return '/warehouse';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'warehouse.name', true, 0, 100);

    let refEmployeeService = new RefEmployeeService(this.warehouseService);
    // let ownerField = new TextFieldInfo(this.getTranslator(), 'ownerName', 'warehouse.owner', false, 0, 100);
    let ownerField = new SmartCmbFieldInfo(this.getTranslator(), refEmployeeService, 'ownerId', 'warehouse.owner', false);

    let phoneField = new TextFieldInfo(this.getTranslator(), 'phone', 'warehouse.phone', true, 0, 20);

    let refStatusService = new RefComboboxService(CMB_FILTERS.WAREHOUSE_STATUS.type, this.warehouseService);
    let statusField = new CmbFieldInfo(this.getTranslator(), refStatusService, 'status', 'ref.warehouse.status', true);

    // TODO: replace this by AddressField
    let addressField = new TextFieldInfo(this.getTranslator(), 'address', 'address.addressDetail', false, 0, 200)

    let columns: GridColumn[] = [
      { fieldInfo: nameField, editable: true, sortable: true, width: 25 },
      { fieldInfo: ownerField, editable: true, sortable: true, width: 20 },
      { fieldInfo: phoneField, editable: true, sortable: true, width: 20 },
      { fieldInfo: statusField, editable: true, sortable: true, width: 10 },
      { fieldInfo: addressField, editable: true, sortable: true, width: 25 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name', 'ownerName', 'address']));
    return grid;
  }

  createModel(): Warehouse {
    return new Warehouse();
  }

  load(): Promise<Warehouse[]> {
    return this.warehouseService.getWarehouses()
      .then(warehouses => {
        return warehouses;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: Warehouse, isEditing: boolean): Promise<Warehouse> {
    return this.warehouseService.saveWarehouse(model, isEditing);
  }

  delete(item: Warehouse): Promise<boolean> {
    return this.warehouseService.deleteWarehouse(item.id);
  }

}