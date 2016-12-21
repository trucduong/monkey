import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo,
  DialogInfo, FormInfo, DialogService,
  TextFieldInfo, DateFieldInfo, CmbFieldInfo, ComboboxService } from '../../shared/index';
import { WarehouseService, RefWarehouseService, WareHouseSearchCondition, WarehouseHistory } from '../shared/index';

import { RefEmployeeService } from '../../employee/index';
import { RefProductService } from '../../product/index';
import { RefSupplierService } from '../../supplier/index';

@Component({
  selector: 'warehouse-history',
  templateUrl: 'src/app/warehouse/history/history.html'
})

export class WarehouseHistoryCmp extends SmartListController<WarehouseHistory> implements OnInit {

  searchDialog: DialogInfo;
  private searchForm: FormInfo;
  private historyType = 'detail';
  private title = 'warehouse.history.detail.list.title';

  constructor(
    private mroute: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private warehouseService: WarehouseService,
    private dialogService: DialogService) {

    super(mroute, translate, router);
    this.onSearchSetting();
  }

  ngOnInit() {
    this.mroute.params.forEach((params: any) => {
      if (params['type']) {
        this.historyType = params['type'];
      }
    });

    if (this.historyType == 'import') {
      this.title = 'warehouse.history.import.list.title';
    } else if (this.historyType == 'detail') {
      this.title = 'warehouse.history.detail.list.title';
    } else if (this.historyType == 'import_returns') {
      this.title = 'warehouse.history.returns.list.title';
    } else if (this.historyType == 'export_returns') {
      this.title = 'warehouse.history.returns.list.title';
    } else if (this.historyType == 'transfer') {
      this.title = 'warehouse.history.transfer.list.title';
    }

    super.ngOnInit();
  }

  getCurrentUrl(): string {
    return '/warehouse-history';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, false, false, false);

    let columns: GridColumn[] = [];
    if (this.historyType == 'import') {
      let field1 = new TextFieldInfo(this.getTranslator(), 'referenceNo', 'warehouse.import.referenceNo', true, 0, 100);
      columns.push({ fieldInfo: field1, editable: false, sortable: true, width: 10 });

      let field10 = new DateFieldInfo(this.getTranslator(), 'historyDateTime', 'warehouse.import.historyDateTime', true, 'datetime');
      columns.push({ fieldInfo: field10, editable: false, sortable: true, width: 10 });

      let field3 = new TextFieldInfo(this.getTranslator(), 'supplier', 'warehouse.import.supplier', true, 0, 100);
      columns.push({ fieldInfo: field3, editable: false, sortable: true, width: 10 });

      let field2 = new TextFieldInfo(this.getTranslator(), 'warehouse', 'warehouse.import.warehouse', true, 0, 100);
      columns.push({ fieldInfo: field2, editable: false, sortable: true, width: 10 });

      let field4 = new TextFieldInfo(this.getTranslator(), 'employee', 'warehouse.import.employee', true, 0, 100);
      columns.push({ fieldInfo: field4, editable: false, sortable: true, width: 10 });

      let field5 = new TextFieldInfo(this.getTranslator(), 'product', 'warehouse.import.product', true, 0, 100);
      columns.push({ fieldInfo: field5, editable: false, sortable: true, width: 10 });

      let field6 = new TextFieldInfo(this.getTranslator(), 'remaining', 'warehouse.import.remaining', true, 0, 100);
      columns.push({ fieldInfo: field6, editable: false, sortable: true, width: 10 });

      let field7 = new TextFieldInfo(this.getTranslator(), 'inputPrice', 'warehouse.import.inputPrice', true, 0, 100);
      columns.push({ fieldInfo: field7, editable: false, sortable: true, width: 10 });

      let field8 = new TextFieldInfo(this.getTranslator(), 'retailPrice', 'warehouse.import.retailPrice', true, 0, 100);
      columns.push({ fieldInfo: field8, editable: false, sortable: true, width: 10 });

      let field9 = new TextFieldInfo(this.getTranslator(), 'wholesalePrice', 'warehouse.import.wholesalePrice', true, 0, 100);
      columns.push({ fieldInfo: field9, editable: false, sortable: true, width: 10 });

    } else if (this.historyType == 'detail') {

      let field10 = new DateFieldInfo(this.getTranslator(), 'historyDateTime', 'warehouse.import.historyDateTime', true, 'datetime');
      columns.push({ fieldInfo: field10, editable: false, sortable: true, width: 20 });

      let field2 = new TextFieldInfo(this.getTranslator(), 'warehouse', 'warehouse.import.warehouse', true, 0, 100);
      columns.push({ fieldInfo: field2, editable: false, sortable: true, width: 25 });

      let field4 = new TextFieldInfo(this.getTranslator(), 'employee', 'warehouse.import.employee', true, 0, 100);
      columns.push({ fieldInfo: field4, editable: false, sortable: true, width: 25 });

      let field5 = new TextFieldInfo(this.getTranslator(), 'product', 'warehouse.import.product', true, 0, 100);
      columns.push({ fieldInfo: field5, editable: false, sortable: true, width: 20 });

      let field6 = new TextFieldInfo(this.getTranslator(), 'remaining', 'warehouse.import.remaining', true, 0, 100);
      columns.push({ fieldInfo: field6, editable: false, sortable: true, width: 10 });

    } else if (this.historyType == 'import_returns') {
      let field10 = new DateFieldInfo(this.getTranslator(), 'historyDateTime', 'warehouse.import.historyDateTime', true, 'datetime');
      columns.push({ fieldInfo: field10, editable: false, sortable: true, width: 15 });

      let field2 = new TextFieldInfo(this.getTranslator(), 'warehouse', 'warehouse.import.warehouse', true, 0, 100);
      columns.push({ fieldInfo: field2, editable: false, sortable: true, width: 20 });

      let field4 = new TextFieldInfo(this.getTranslator(), 'employee', 'warehouse.import.employee', true, 0, 100);
      columns.push({ fieldInfo: field4, editable: false, sortable: true, width: 15 });

      let field5 = new TextFieldInfo(this.getTranslator(), 'product', 'warehouse.import.product', true, 0, 100);
      columns.push({ fieldInfo: field5, editable: false, sortable: true, width: 20 });

      let field6 = new TextFieldInfo(this.getTranslator(), 'remaining', 'warehouse.import.remaining', true, 0, 100);
      columns.push({ fieldInfo: field6, editable: false, sortable: true, width: 10 });

      let field7 = new TextFieldInfo(this.getTranslator(), 'description', 'product.description', true, 0, 500);
      columns.push({ fieldInfo: field7, editable: false, sortable: true, width: 20 });

    } else if (this.historyType == 'export_returns') {
      let field10 = new DateFieldInfo(this.getTranslator(), 'historyDateTime', 'warehouse.import.historyDateTime', true, 'datetime');
      columns.push({ fieldInfo: field10, editable: false, sortable: true, width: 15 });

      let field2 = new TextFieldInfo(this.getTranslator(), 'warehouse', 'warehouse.import.warehouse', true, 0, 100);
      columns.push({ fieldInfo: field2, editable: false, sortable: true, width: 15 });

      let field4 = new TextFieldInfo(this.getTranslator(), 'employee', 'warehouse.import.employee', true, 0, 100);
      columns.push({ fieldInfo: field4, editable: false, sortable: true, width: 15 });

      let field8 = new TextFieldInfo(this.getTranslator(), 'supplier', 'warehouse.import.supplier', true, 0, 100);
      columns.push({ fieldInfo: field8, editable: false, sortable: true, width: 15 });

      let field5 = new TextFieldInfo(this.getTranslator(), 'product', 'warehouse.import.product', true, 0, 100);
      columns.push({ fieldInfo: field5, editable: false, sortable: true, width: 15 });

      let field6 = new TextFieldInfo(this.getTranslator(), 'remaining', 'warehouse.import.remaining', true, 0, 100);
      columns.push({ fieldInfo: field6, editable: false, sortable: true, width: 10 });

      let field7 = new TextFieldInfo(this.getTranslator(), 'description', 'product.description', true, 0, 500);
      columns.push({ fieldInfo: field7, editable: false, sortable: true, width: 15 });

    } else if (this.historyType == 'transfer') {

      let field10 = new DateFieldInfo(this.getTranslator(), 'historyDateTime', 'warehouse.import.historyDateTime', true, 'datetime');
      columns.push({ fieldInfo: field10, editable: false, sortable: true, width: 15 });

      let field2 = new TextFieldInfo(this.getTranslator(), 'warehouse', 'warehouse.transfer.from', true, 0, 100);
      columns.push({ fieldInfo: field2, editable: false, sortable: true, width: 20 });

      let field7 = new TextFieldInfo(this.getTranslator(), 'customer', 'warehouse.transfer.to', true, 0, 100);
      columns.push({ fieldInfo: field2, editable: false, sortable: true, width: 20 });

      let field4 = new TextFieldInfo(this.getTranslator(), 'employee', 'warehouse.import.employee', true, 0, 100);
      columns.push({ fieldInfo: field4, editable: false, sortable: true, width: 15 });

      let field5 = new TextFieldInfo(this.getTranslator(), 'product', 'warehouse.import.product', true, 0, 100);
      columns.push({ fieldInfo: field5, editable: false, sortable: true, width: 20 });

      let field6 = new TextFieldInfo(this.getTranslator(), 'remaining', 'warehouse.import.remaining', true, 0, 100);
      columns.push({ fieldInfo: field6, editable: false, sortable: true, width: 10 });

    }



    let grid = new SmartGridInfo(option, columns, [], new SortInfo('historyDateTime', 'desc'), new FilterInfo(['employee', 'product', 'warehouse']));
    return grid;
  }

  createModel(): WarehouseHistory {
    return new WarehouseHistory();
  }

  load(): Promise<WarehouseHistory[]> {
    if (this.searchDialog && !this.searchDialog.isShow) {
      let model = this.searchForm ? this.searchForm.model : null;
      return this.warehouseService.getHistories(model, this.historyType)
        .then(items => {
          return items;
        })
        .catch(error => {
          return [];
        });
    } else {
      return Promise.resolve([]);
    }
  }

  closeDialog(dialog: DialogInfo) {
    this.dialogService.hide(dialog);
  }

  createSearchForm() {
    let mthis = this;
    let model = new WareHouseSearchCondition();
    let form = new FormInfo(this.getTranslator(), model, '');

    form.addField(new DateFieldInfo(this.getTranslator(), 'historyDateTime', 'warehouse.import.historyDateTime', false, 'date'));

    if (this.historyType == 'import') {
      form.addField(new TextFieldInfo(this.getTranslator(), 'referenceNo', 'warehouse.import.referenceNo', false, 0, 100));
    }

    let refWarehouseService = new RefWarehouseService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refWarehouseService, 'warehouseId', 'warehouse.import.warehouseId', false));

    if (this.historyType == 'import' || this.historyType == 'export_returns') {
      let refSupplierService = new RefSupplierService(this.warehouseService);
      form.addField(new CmbFieldInfo(this.getTranslator(), refSupplierService, 'supplierId', 'warehouse.import.supplier', false));
    }

    let refEmployeeService = new RefEmployeeService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refEmployeeService, 'employeeId', 'warehouse.import.employee', false));

    let refProductService = new RefProductService(this.warehouseService);
    form.addField(new CmbFieldInfo(this.getTranslator(), refProductService, 'productId', 'warehouse.import.product', false));

    return form;
  }

  onSearchSetting() {
    if (!this.searchDialog) {
      this.searchDialog = new DialogInfo();
      this.searchForm = this.createSearchForm();
    }

    this.dialogService.show(this.searchDialog);
  }

  onSearch() {
    this.closeDialog(this.searchDialog);
    this.showLoading();
    this.onLoad();
    this.hideLoading();
  }
}
