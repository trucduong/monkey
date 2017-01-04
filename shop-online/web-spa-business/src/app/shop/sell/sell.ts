import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, GridColumn, SortInfo, SmartGridInfo, FormInfo, AlertType,
  GridOption, TextAreaFieldInfo, TextFieldInfo, CmbFieldInfo, SmartCmbFieldInfo, NumberFieldInfo, ComboboxService } from '../../shared/index';
import {WarehouseService, RefWarehouseService } from '../../warehouse/shared/index';
import {Product, RefProductService} from '../../product/shared/index';
import {RefEmployeeService} from '../../employee/shared/index';
import { OrderModel, OrderDetailModel } from '../shared/index';

@Component({
  selector: 'sell-cmp',
  templateUrl: 'src/app/shop/sell/sell.html'
})

export class SellCmp extends BaseController implements OnInit {

  model: OrderModel;
  gridInfo: SmartGridInfo;
  formInfo: FormInfo;
  currentDate: Date;

  tempTxt: string;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService) {
    super(router, translate);

    this.model = new OrderModel();
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
    this.gridInfo.model = new OrderDetailModel();
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
    let nameField = new TextFieldInfo(this.getTranslator(), 'productName', 'shop.order.name', true, 0, 100);
    let remainingField = new NumberFieldInfo(this.getTranslator(), 'remaining', 'product.remaining', true, 0, 0);
    let priceField = new NumberFieldInfo(this.getTranslator(), 'price', 'shop.order.price', true, 0, 0, 1000);
    let discountField = new NumberFieldInfo(this.getTranslator(), 'discount', 'shop.order.total.discount', true, 0, 0, 1000);
    let totalField = new NumberFieldInfo(this.getTranslator(), 'total', 'shop.order.total', true, 0, 0, 1000);
    let descriptionField = new TextFieldInfo(this.getTranslator(), 'description', 'shop.order.description', true, 0, 500);

    let columns: GridColumn[] = [
      // { fieldInfo: idField, editable: false, sortable: true, width: 1 },
      { fieldInfo: nameField, editable: false, sortable: true, width: 30 },
      { fieldInfo: remainingField, editable: true, sortable: true, width: 10 },
      { fieldInfo: priceField, editable: true, sortable: true, width: 15 },
      { fieldInfo: discountField, editable: true, sortable: true, width: 15 },
      { fieldInfo: totalField, editable: true, sortable: true, width: 20 },
      { fieldInfo: descriptionField, editable: true, sortable: false, width: 10 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), null);

    let mthis = this;
    grid.addValueChangeListener({
      onChanged(event) {
        mthis.tempTxt = event.field +': '+ event.newValue;
      }
    });


    return grid;
  }

  buildInputForm(): FormInfo {
    let form = new FormInfo(this.getTranslator(), this.model, '');

    form.addField(new TextAreaFieldInfo(this.getTranslator(), 'description', 'shop.order.description', false, 1000, 3));

    let refWarehouseService = new RefWarehouseService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refWarehouseService, 'warehouseId', 'warehouse.import.warehouseId', true));
    
    let refEmployeeService = new RefEmployeeService(this.warehouseService);
    form.addField(new SmartCmbFieldInfo(this.getTranslator(), refEmployeeService, 'employeeId', 'warehouse.import.employee', true));

    let totalPriceField = new TextFieldInfo(this.getTranslator(),'totalPrice','shop.order.total.price',true, 0, 100);
    totalPriceField.enabled = false;
    form.addField(totalPriceField);

    let discountField = new TextFieldInfo(this.getTranslator(),'discount','shop.order.total.discount',true, 0, 100);
    discountField.enabled = false;
    form.addField(discountField);

    let totalField = new TextFieldInfo(this.getTranslator(),'total','shop.order.total',true, 0, 100);
    totalField.enabled = false;
    form.addField(totalField);

    return form;
  }

  onExecute(param: any) {
    let mthis = this;
    if (param.action == 'add') {
      let model = <OrderDetailModel>param.data;
      model.remaining = 1;
      param.callBack({ action: 'add', data: model });
    } else if (param.action == 'saveAll') {
      // validaion
      let models = <OrderDetailModel[]>param.data
      if (!models || models.length == 0) {
        return;
      }

      if (!mthis.formInfo.validate(mthis.model)) {
        return;
      }

      // // repare data
      // mthis.model.details = models;
      // mthis.model.employeeId = mthis.getCurrentUser().employeeId;
      // mthis.model.employeeName = mthis.getCurrentUser().employeeName;

      // // call save service
      // mthis.showLoading();
      // mthis.warehouseService.saveDetails(mthis.model, 'import')
      // .then(res => {
      //   mthis.hideLoading();
      //   mthis.alert(AlertType.success, 'common.alert.content.update.success');
      //   param.callBack({action:'clear'});
      // })
      // .catch(err => {
      //   mthis.hideLoading();
      //   mthis.alert(AlertType.danger, err);
      // });
    }
  }
}