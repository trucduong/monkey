import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, GridColumn, SortInfo, SmartGridInfo, FormInfo, AlertType,
  GridOption, TextFieldInfo, CmbFieldInfo, SmartCmbFieldInfo, NumberFieldInfo, ComboboxService } from '../../shared/index';
import {WarehouseService, ImportModel, RefWarehouseService } from '../shared/index';
import {Product, RefProductService} from '../../product/shared/index';
import {RefSupplierService} from '../../supplier/shared/index';

@Component({
  selector: 'warehouse-import',
  templateUrl: 'src/app/warehouse/import/import.html'
})

export class WarehouseImportCmp extends BaseController implements OnInit {

  model: ImportModel;
  gridInfo: SmartGridInfo;
  formInfo: FormInfo;
  currentDate: Date;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {
    super(router, translate);

    this.model = new ImportModel();
    this.updateCurrentDate();
  }

  updateCurrentDate() {
    let mthis = this;
    mthis.currentDate = new Date();
    window.setTimeout(tick => {
      mthis.updateCurrentDate();
    }, 1000);
  }

  getCurrentUrl(): string {
    return '/warehouse-import';
  }

  ngOnInit() {
    this.showLoading();
    this.formInfo = this.buildInputForm();

    this.gridInfo = this.buildGrid();
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

  buildGrid(): SmartGridInfo {
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

  buildInputForm(): FormInfo {
    let form = new FormInfo(this.getTranslator(), this.model, '');

    form.addField(new TextFieldInfo(this.getTranslator(), 'referenceNo', 'warehouse.import.referenceNo', false, 0, 100));

    let refWarehouseService = new RefWarehouseService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refWarehouseService, 'warehouseId', 'warehouse.import.warehouseId', true));

    let refSupplierService = new RefSupplierService(this.warehouseService);
    form.addField(new SmartCmbFieldInfo(this.getTranslator(), refSupplierService, 'supplier', 'warehouse.import.supplier', false, true));

    return form;
  }

  createModel(): Product {
    return new Product();
  }

  onExecute(param: any) {
    let mthis = this;
    if (param.action == 'add') {
      let product = <Product>param.data;
      product.remaining = 1;
      param.callBack({ action: 'add', data: product });
    } else if (param.action == 'saveAll') {
      // validaion
      let products = <Product[]>param.data
      if (!products || products.length == 0) {
        return;
      }

      if (!mthis.formInfo.validate(mthis.model)) {
        return;
      }

      // repare data
      mthis.model.details = products;
      mthis.model.employeeId = mthis.getCurrentUser().employeeId;

      // call save service
      mthis.showLoading();
      mthis.warehouseService.importProducts(mthis.model)
      .then(res => {
        mthis.hideLoading();
        mthis.alert(AlertType.success, 'common.alert.content.update.success');
        param.callBack({action:'clear'});
      })
      .catch(err => {
        mthis.hideLoading();
        mthis.alert(AlertType.danger, err);
      });
    }
  }
}