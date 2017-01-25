import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, GridColumn, SortInfo, SmartGridInfo, FormInfo, AlertType, FilterInfo,
  GridOption, TextFieldInfo, NumberFieldInfo, CmbFieldInfo, ComboboxService } from '../../shared/index';

import {WarehouseService, WarehouseDetail, RefWarehouseService } from '../shared/index';

@Component({
  selector: 'warehouse-status',
  templateUrl: 'src/app/warehouse/status/status.html'
})

export class WarehouseStatusCmp extends SmartListController<WarehouseDetail> implements OnInit {

  warehouseId: string;
  warehouseName: string;
  warehouseFilter: CmbFieldInfo;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {
    super(route, translate, router);

    let refWarehouseService = new RefWarehouseService(this.warehouseService);
    this.warehouseFilter = new CmbFieldInfo(this.getTranslator(), refWarehouseService, 'warehouseId', 'warehouse.status.warehouse', true);
    let mthis = this;
    this.warehouseFilter.addValueChangeListener({
      onChanged(event) {
        mthis.onLoad();
      }
    });
  }

  getCurrentUrl(): string {
    return '/warehouse-status';
  }

  load(): Promise<WarehouseDetail[]> {
    if (this.warehouseId) {
      return this.warehouseService.getStatus(this.warehouseId);
    } else {
      return Promise.resolve([]);
    }
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, false, false, false);

    let warehouseField = new TextFieldInfo(this.getTranslator(), 'warehouseName', 'warehouse.status.warehouse', true, 0, 100);
    let productField = new TextFieldInfo(this.getTranslator(), 'productName', 'warehouse.status.product', true, 0, 100);
    let remainingField = new NumberFieldInfo(this.getTranslator(), 'remaining', 'warehouse.status.remaining', true, 0, 0);
    let descriptionField = new TextFieldInfo(this.getTranslator(), 'description', 'warehouse.status.description', true, 0, 500);

    let columns: GridColumn[] = [
      { fieldInfo: warehouseField, editable: false, sortable: true, width: 30 },
      { fieldInfo: productField, editable: false, sortable: true, width: 30 },
      { fieldInfo: remainingField, editable: true, sortable: true, width: 10 },
      { fieldInfo: descriptionField, editable: false, sortable: true, width: 30 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('productName', 'asc'), new FilterInfo(['productName']));
    return grid;
  }

  onExport() {
    if (this.warehouseId) {
      this.warehouseService.downloadStatus(this.warehouseId);
    }
  }

}