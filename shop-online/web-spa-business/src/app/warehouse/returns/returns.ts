import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, GridColumn, SortInfo, SmartGridInfo, FormInfo, AlertType,
  GridOption, TextFieldInfo, CmbFieldInfo, NumberFieldInfo, ComboboxService } from '../../shared/index';
import {WarehouseService, WarehouseModel, RefWarehouseService } from '../shared/index';
import {Product, RefProductService} from '../../product/shared/index';
import {RefEmployeeService} from '../../employee/shared/index';

@Component({
  selector: 'warehouse-returns',
  templateUrl: 'src/app/warehouse/returns/returns.html'
})

export class WarehouseReturnCmp extends BaseController implements OnInit {

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
    return '/warehouse-returns';
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
    let descriptionField = new TextFieldInfo(this.getTranslator(), 'description', 'product.description', false, 0, 500);

    let columns: GridColumn[] = [
      // { fieldInfo: idField, editable: false, sortable: true, width: 1 },
      { fieldInfo: nameField, editable: false, sortable: true, width: 40 },
      { fieldInfo: remainingField, editable: true, sortable: true, width: 10 },
      { fieldInfo: descriptionField, editable: true, sortable: true, width: 50 },
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
    this.model.employeeName = this.getCurrentUser().employeeName;

    return form;
  }

  createModel(): Product {
    return new Product();
  }

  onExecute(param: any) {
    let mthis = this;
    if (param.action == 'add') {
      let product = new Product()
      product.id = param.data.value;
      product.name = param.data.label;
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

      // call save service
      mthis.showLoading();
      mthis.warehouseService.saveDetails(mthis.model, 'import_returns')
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
}