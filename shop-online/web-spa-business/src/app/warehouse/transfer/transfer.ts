import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, GridColumn, SortInfo, SmartGridInfo, FormInfo, AlertType,
  GridOption, TextFieldInfo, CmbFieldInfo, NumberFieldInfo, ComboboxService } from '../../shared/index';
import {WarehouseService, WarehouseModel, RefWarehouseService } from '../shared/index';
import {Product, RefProductService} from '../../product/shared/index';
import {RefEmployeeService} from '../../employee/shared/index';

@Component({
  selector: 'warehouse-transfer',
  templateUrl: 'src/app/warehouse/transfer/transfer.html'
})

export class WarehouseTransferCmp extends BaseController implements OnInit {

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
    return '/warehouse-transfer';
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
    let mthis = this;
    let form = new FormInfo(this.getTranslator(), this.model, '');

    let refWarehouseService = new RefWarehouseService(this.warehouseService);
    let warehouseField = new CmbFieldInfo(this.getTranslator(), refWarehouseService, 'warehouseId', 'warehouse.transfer.from', true);
    form.addField(warehouseField);

    let warehouse1Field = new CmbFieldInfo(this.getTranslator(), refWarehouseService, 'warehouseId1', 'warehouse.transfer.to', true);
    warehouse1Field.setFilter(this.warehouseFilter);
    form.addField(warehouse1Field);

    warehouseField.addValueChangeListener({
      onChanged(event) {
        warehouse1Field.reFilter(mthis.model.warehouseId);
      }
    });

    let refEmployeeService = new RefEmployeeService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refEmployeeService, 'employeeId', 'warehouse.import.employee', true));
    this.model.employeeId = this.getCurrentUser().employeeId;
    this.model.employeeName = this.getCurrentUser().employeeName;

    return form;
  }

  warehouseFilter(items: any[]) {
    let filter = this;
    let warehouseId = filter['param'];
    return items.filter(item => {
      return item.value != warehouseId;
    });
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
      mthis.warehouseService.saveDetails(mthis.model, 'transfer')
        .then(res => {
          mthis.hideLoading();
          mthis.alert(AlertType.success, 'common.alert.content.update.success');
          param.callBack({ action: 'clear' });
        })
        .catch(err => {
          mthis.hideLoading();
          mthis.alert(AlertType.danger, err.msg);
        });
    }
  }

  onAdd(param: any) {
    let mthis = this;
    let warehouseId = mthis.model.warehouseId;
    let product = new Product()
    product.id = param.data.value;
    product.name = param.data.label;
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
}