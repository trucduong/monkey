import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, GridColumn, SortInfo, SmartGridInfo,
  GridOption, TextFieldInfo, CmbFieldInfo, NumberFieldInfo, ComboboxService } from '../../shared/index';
import {WarehouseService, ImportModel } from '../shared/index';
import {Product, RefProductService} from '../../product/shared/index';

@Component({
  selector: 'warehouse-import',
  templateUrl: 'src/app/warehouse/import/import.html'
})

export class WarehouseImportCmp extends BaseController implements OnInit {

  gridInfo: SmartGridInfo;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {
    super(router, translate);
  }

  getCurrentUrl(): string {
    return '/warehouse-import';
  }

  ngOnInit() {
    this.showLoading();

    this.gridInfo = this.build();
    this.gridInfo.model = this.createModel();
    this.gridInfo.translateServices = this.getTranslateServices();
    this.gridInfo.columns.forEach(col => {
      col.fieldInfo.isSingle = true; // hide lable
    });
    this.hideLoading();
  }


  getTranslateServices(): Map<string, ComboboxService> {
    let services = new Map<string, ComboboxService>();
    let refProductService = new RefProductService(this.warehouseService);
    services.set('filter.list', refProductService);
    return services;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, false, true, false);

    // let idField = new TextFieldInfo(this.getTranslator(), 'id', 'product.id', true, 0, 100);
    // idField.visible = false;
    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'product.name', true, 0, 100);
    let remainingField = new NumberFieldInfo(this.getTranslator(), 'remaining', 'product.remaining', true, 0, 0);
    let inputPriceField = new NumberFieldInfo(this.getTranslator(), 'inputPrice', 'product.inputPrice', true, 0, 0, 1000);
    let wholesalePriceField = new NumberFieldInfo(this.getTranslator(), 'wholesalePrice', 'product.wholesalePrice', true, 0, 0, 1000);
    let retailPriceField = new NumberFieldInfo(this.getTranslator(), 'retailPrice', 'product.retailPrice', true, 0, 0, 1000);

    let columns: GridColumn[] = [
      // { fieldInfo: idField, editable: false, sortable: true, width: 1 },
      { fieldInfo: nameField, editable: false, sortable: true, width: 30 },
      { fieldInfo: remainingField, editable: true, sortable: true, width: 10 },
      { fieldInfo: inputPriceField, editable: true, sortable: true, width: 20 },
      { fieldInfo: wholesalePriceField, editable: true, sortable: true, width: 20 },
      { fieldInfo: retailPriceField, editable: true, sortable: true, width: 20 },
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), null);
    return grid;
  }

  createModel(): Product {
    return new Product();
  }

  onExecute(param: any) {
    if (param.action == 'add') {
      let product = <Product>param.data;
      product.remaining = 1;
      param.callBack({action: 'add', data: product});
    }
  }
}