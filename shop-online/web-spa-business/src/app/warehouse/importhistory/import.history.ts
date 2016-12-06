import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo,
  TextFieldInfo, DateFieldInfo, ComboboxService } from '../../shared/index';
import { ImportHistory, WarehouseService, RefWarehouseService } from '../shared/index';

import { RefEmployeeService } from '../../employee/index';
import { RefProductService } from '../../product/index';
import { RefSupplierService } from '../../supplier/index';

@Component({
  selector: 'warehouse-import-history',
  templateUrl: 'src/app/warehouse/importhistory/import.history.html'
})

export class WarehouseImportHistoryCmp extends SmartListController<ImportHistory> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {

    super(route, translate, router);
  }

  getCurrentUrl(): string {
    return '/warehouse-import-history';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    // map.set('warehouse.import.product', new RefProductService(this.warehouseService));
    // map.set('warehouse.import.employee', new RefEmployeeService(this.warehouseService));
    // map.set('warehouse.import.supplier', new RefSupplierService(this.warehouseService));
    // map.set('warehouse.import.warehouseId', new RefWarehouseService(this.warehouseService));
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, false, false, false);
    let field1 = new TextFieldInfo(this.getTranslator(), 'referenceNo', 'warehouse.import.referenceNo', true, 0, 100);
    let field2 = new TextFieldInfo(this.getTranslator(), 'warehouse', 'warehouse.import.warehouse', true, 0, 100);
    let field3 = new TextFieldInfo(this.getTranslator(), 'supplier', 'warehouse.import.supplier', true, 0, 100);
    let field4 = new TextFieldInfo(this.getTranslator(), 'employee', 'warehouse.import.employee', true, 0, 100);
    let field5 = new TextFieldInfo(this.getTranslator(), 'product', 'warehouse.import.product', true, 0, 100);
    let field6 = new TextFieldInfo(this.getTranslator(), 'remaining', 'warehouse.import.remaining', true, 0, 100);
    let field7 = new TextFieldInfo(this.getTranslator(), 'inputPrice', 'warehouse.import.inputPrice', true, 0, 100);
    let field8 = new TextFieldInfo(this.getTranslator(), 'retailPrice', 'warehouse.import.retailPrice', true, 0, 100);
    let field9 = new TextFieldInfo(this.getTranslator(), 'wholesalePrice', 'warehouse.import.wholesalePrice', true, 0, 100);
    let field10 = new DateFieldInfo(this.getTranslator(), 'historyDateTime', 'warehouse.import.historyDateTime', true, 'datetime');

    let columns: GridColumn[] = [
      { fieldInfo: field1, editable: false, sortable: true, width: 10 },
      { fieldInfo: field10, editable: false, sortable: true, width: 10 },
      { fieldInfo: field2, editable: false, sortable: true, width: 10 },
      { fieldInfo: field3, editable: false, sortable: true, width: 10 },
      { fieldInfo: field4, editable: false, sortable: true, width: 10 },
      { fieldInfo: field5, editable: false, sortable: true, width: 10 },
      { fieldInfo: field6, editable: false, sortable: true, width: 10 },
      { fieldInfo: field7, editable: false, sortable: true, width: 10 },
      { fieldInfo: field8, editable: false, sortable: true, width: 10 },
      { fieldInfo: field9, editable: false, sortable: true, width: 10 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('historyDateTime', 'desc'), new FilterInfo(['referenceNo', 'product', 'warehouse']));
    return grid;
  }

  createModel(): ImportHistory {
    return new ImportHistory();
  }

  load(): Promise<ImportHistory[]> {
    return this.warehouseService.getImportHistories()
      .then(items => {
        return items;
      })
      .catch(error => {
        return [];
      });
  }

}
