import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { BaseController, GridColumn, SortInfo, SmartGridInfo, FormInfo, AlertType, GridInputCmp,
  DialogInfo,DialogService,
  GridOption, TextAreaFieldInfo, TextFieldInfo, CmbFieldInfo, SmartCmbFieldInfo, NumberFieldInfo, ComboboxService } from '../../shared/index';
import {WarehouseService, RefWarehouseService } from '../../warehouse/shared/index';
import {Product, RefProductService, ProductService} from '../../product/shared/index';
import {RefEmployeeService} from '../../employee/shared/index';
import { OrderModel, OrderDetailModel, OrderService, OrderPaymentModel } from '../shared/index';

@Component({
  selector: 'sell-cmp',
  templateUrl: 'src/app/shop/sell/sell.html'
})

export class SellCmp extends BaseController implements OnInit {

  @ViewChild(GridInputCmp)
  gridInputCmp: GridInputCmp<OrderDetailModel>;

  model: OrderModel;
  gridInfo: SmartGridInfo;
  formInfo: FormInfo;
  currentDate: Date;

  paymentDialog: DialogInfo;
  paymentForm: FormInfo;
  paymentModel: OrderPaymentModel;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private orderService: OrderService,
    private dialogService: DialogService) {
    super(router, translate);

    this.model = new OrderModel();
    this.model.totalDiscount = 0;
    this.model.total = 0
    this.model.totalPrice = 0;
    this.updateCurrentDate();

    this.paymentDialog = new DialogInfo();
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
    let option = new GridOption(true, false, true, false);

    // let idField = new TextFieldInfo(this.getTranslator(), 'id', 'product.id', true, 0, 100);
    // idField.visible = false;
    let nameField = new TextFieldInfo(this.getTranslator(), 'productName', 'shop.order.name', true, 0, 100);
    let remainingField = new NumberFieldInfo(this.getTranslator(), 'remaining', 'product.remaining', true, 1, null);
    let priceField = new NumberFieldInfo(this.getTranslator(), 'price', 'shop.order.price', true, 0, null, 1000);
    let discountField = new NumberFieldInfo(this.getTranslator(), 'discount', 'shop.order.discount', true, 0, null, 1);
    let totalField = new NumberFieldInfo(this.getTranslator(), 'total', 'shop.order.total', true, 0, null, 1000);
    let descriptionField = new TextFieldInfo(this.getTranslator(), 'description', 'shop.order.description', false, 0, 500);

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
        mthis.calculate(true, event.field);
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

    // let totalPriceField = new TextFieldInfo(this.getTranslator(),'totalPrice','shop.order.total.price',true, 0, 100);
    // totalPriceField.enabled = false;
    // form.addField(totalPriceField);

    let mthis = this;
    let totalDiscountField = new NumberFieldInfo(this.getTranslator(), 'totalDiscount', 'shop.order.total.discount', true, 0, 0, 1000);
    totalDiscountField.addValueChangeListener({
      onChanged(event) {
        mthis.onDiscountChange();
      }
    })
    form.addField(totalDiscountField);

    // let totalField = new TextFieldInfo(this.getTranslator(),'total','shop.order.total',true, 0, 100);
    // totalField.enabled = false;
    // form.addField(totalField);

    return form;
  }

  onExecute(param: any) {
    let mthis = this;
    if (param.action == 'add') {
      mthis.add(param);
    } else if (param.action == 'delete') {
      mthis.calculate();
    } else if (param.action == 'saveAll') {
      // validaion
      let models = <OrderDetailModel[]>mthis.gridInputCmp.items;
      if (!models || models.length == 0) {
        return;
      }

      if (!mthis.formInfo.validate(mthis.model)) {
        return;
      }

      mthis.showDialog();
      //mthis.checkout();
    }
  }

  add(param: any) {
    let mthis = this;
    mthis.showLoading();
    let model: OrderDetailModel = new OrderDetailModel();
    model.remaining = 1;
    model.id = param.data.value;
    model.productId = param.data.value;
    model.productName = param.data.label;
    mthis.productService.getProduct(model.productId)
      .then(product => {
        model.productName = product.name;
        model.discount = product.discount;
        model.price = product.wholesalePrice;
        model.total = model.price - model.price * (model.discount / 100)

        mthis.hideLoading();
        param.callBack({ action: 'add', data: model });
        mthis.calculate();
      })
      .catch(err => {
        mthis.hideLoading();
        param.callBack({ action: 'add', data: model });
        mthis.calculate();
      });
  }

  checkout() {
    let mthis = this;
    let models = <OrderDetailModel[]>mthis.gridInputCmp.items;
    // repare data
    mthis.model.details = models;

    // call save service
    mthis.showLoading();
    mthis.orderService.createOrder(mthis.model)
    .then(res => {
      mthis.hideLoading();
      mthis.alert(AlertType.success, 'common.alert.content.update.success');
      // download order
      if (this.paymentModel.print) {
        mthis.orderService.downloadOrder(res['id']);
      }
      // clear screen
      mthis.cancel();
    })
    .catch(err => {
      console.log(err);
      mthis.hideLoading();
      if ('service.error.invalid.value' == err.msg && err.detail) {
        let errors = JSON.parse(err.detail);
        errors.forEach(e => {
          mthis.alert(AlertType.warning, 'shop.order.error.product.remaining',{product: e.description, remaining: e.validValue});
        });
      }
      mthis.showErrorMessage({key: err.msg});
    });
  }

  cancel() {
    this.gridInputCmp.items = [];
    this.gridInputCmp.searchText = "";
    this.model.employeeId = null;
    this.model.employeeName = "";
    this.model.description = "";
    this.model.total = 0;
    this.model.totalDiscount = 0;
    this.model.totalPrice = 0;
  }

  calculate(calculateSelectedRow?: boolean, field?: string) {
    if (!this.gridInputCmp.items) {
      return;
    }

    if (calculateSelectedRow) {
      let selectedItem = this.gridInputCmp.selectedItem;
      if (selectedItem && field != 'total') {
        selectedItem.total = selectedItem.remaining * selectedItem.price * (1 - selectedItem.discount / 100);
      }
    }

    let subtotal = 0;
    this.gridInputCmp.items.forEach(item => {
      subtotal += Number(item.total);
    });
    let totalDiscount = this.model.totalDiscount;
    let total = subtotal - totalDiscount;
    if (total < 0) {
      total = 0;
    }
    this.model.total = total;
    this.model.totalPrice = subtotal;
  }

  onDiscountChange() {
    this.model.totalDiscount = this.model.totalDiscount > 0 ? this.model.totalDiscount : 0;
    let total = this.model.totalPrice - this.model.totalDiscount;
    this.model.total = total > 0 ? total : 0;
  }

  showDialog() {
    this.paymentModel = new OrderPaymentModel();
    this.paymentModel.total = this.model.total;
    this.paymentModel.received = this.model.total;
    this.paymentModel.rest = 0;
    this.paymentModel.print = true;
    this.paymentModel.createDate = new Date();

    this.paymentForm = new FormInfo(this.getTranslator(), this.paymentModel, 'shop.order.payment');
    let recievedField = new NumberFieldInfo(this.getTranslator(), 'received', 'shop.payment.received', true, 0, null, 1000);
    this.paymentForm.addField(recievedField);

    this.dialogService.show(this.paymentDialog);
  }

  closeDialog(dialog: DialogInfo) {
    this.dialogService.hide(dialog);
  }

  onPayment(action: string) {
    if (action == 'CANCEL') {
      this.closeDialog(this.paymentDialog);
    } else if (action == 'OK')  {
      // validate
      if (!this.paymentForm.validate(this.paymentModel)) {
        return;
      }

      // add payments info
      if (this.paymentModel.received > 0) {
        this.model.paymentStatus = 'PAID';
        this.model.payments = [];
        this.model.payments.push(this.paymentModel);
      } else {
        this.model.payments = null;
        this.model.paymentStatus = null;
      }

      this.checkout();
      this.closeDialog(this.paymentDialog);
    }
  }
}