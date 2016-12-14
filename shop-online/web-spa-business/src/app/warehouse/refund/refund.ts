import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, GridColumn, SortInfo, SmartGridInfo, FormInfo, AlertType,
  GridOption, TextFieldInfo, CmbFieldInfo, NumberFieldInfo, ComboboxService } from '../../shared/index';
import {WarehouseService, WarehouseModel, RefWarehouseService } from '../shared/index';
import {Product, RefProductService} from '../../product/shared/index';
import {RefEmployeeService} from '../../employee/shared/index';

@Component({
  selector: 'warehouse-refund',
  templateUrl: 'src/app/warehouse/detail/detail.html'
})

export class WarehouseDetailCmp extends BaseController implements OnInit {

  model: WarehouseModel;
  gridInfo: SmartGridInfo;
  formInfo: FormInfo;
  currentDate: Date;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {
    super(router, translate);

    this.model = new WarehouseModel();
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
    return '/warehouse-detail';
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

    let columns: GridColumn[] = [
      // { fieldInfo: idField, editable: false, sortable: true, width: 1 },
      { fieldInfo: nameField, editable: false, sortable: true, width: 80 },
      { fieldInfo: remainingField, editable: true, sortable: true, width: 20 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), null);
    return grid;
  }

  buildInputForm(): FormInfo {
    let form = new FormInfo(this.getTranslator(), this.model, '');

    let refWarehouseService = new RefWarehouseService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refWarehouseService, 'warehouseId', 'warehouse.import.warehouseId', true));

    let refEmployeeService = new RefEmployeeService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refEmployeeService, 'employeeId', 'warehouse.import.employee', true));
    this.model.employeeId = this.getCurrentUser().employeeId;

    return form;
  }

  createModel(): Product {
    return new Product();
  }

  onExecute(param: any) {
    let mthis = this;
    if (param.action == 'add') {
      mthis.onAdd(param);

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

      // call save service
      mthis.showLoading();
      mthis.warehouseService.saveDetails(mthis.model)
        .then(res => {
          mthis.hideLoading();
          mthis.alert(AlertType.success, 'common.alert.content.update.success');
          param.callBack({ action: 'clear' });
        })
        .catch(err => {
          mthis.hideLoading();
          mthis.alert(AlertType.danger, err);
        });
    }
  }

  onAdd(param: any) {
    let mthis = this;
    let warehouseId = mthis.model.warehouseId;
    let product = <Product>param.data;
    if (!warehouseId) {
      product.remaining = 1;
      param.callBack({ action: 'add', data: product });
    } else {
      mthis.showLoading();
      mthis.warehouseService.getDetail(warehouseId, product.id)
        .then(res => {
          mthis.hideLoading();
          product.remaining = res.remaining;
          param.callBack({ action: 'add', data: product });
        })
        .catch(err => {
          mthis.hideLoading();
          product.remaining = 0;
          param.callBack({ action: 'add', data: product });
        });
    }
  }

  onExport() {
    this.warehouseService.downloadDetails();
  }
}