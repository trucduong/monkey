import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, CmbFieldInfo, NumberFieldInfo, EmailFieldInfo,
  ComboboxService, RefComboboxService } from './../shared/index';
import { Supplier, SupplierService, RefSupplierGroupService } from './shared/index';

@Component({
  selector: 'supplier',
  templateUrl: 'src/app/supplier/supplier.html'
})

export class SupplierCmp extends SmartListController<Supplier> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private supplierService: SupplierService) {

    super(route, translate, router);

    // TODO: move to sidebar menu
    this.resetNavigation();
  }

  getCurrentUrl(): string {
    return '/supplier';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'supplier.name', true, 0, 100);

    let phoneField = new TextFieldInfo(this.getTranslator(), 'phone', 'supplier.phone', true, 0, 20);
    
    let emailField = new EmailFieldInfo(this.getTranslator(), 'email', 'supplier.email', false, 0, 100);

    // TODO: replace this by AddressField
    let addressField = new TextFieldInfo(this.getTranslator(), 'address', 'address.addressDetail', false, 0, 200)

    let refSupplierGroupService = new RefSupplierGroupService(this.supplierService);
    let groupField = new CmbFieldInfo(this.getTranslator(), refSupplierGroupService, 'groupId', 'supplier.group', true);

    let description = new TextFieldInfo(this.getTranslator(), 'description', 'supplier.description', false, 0, 500)

    let columns: GridColumn[] = [
      {fieldInfo: nameField, editable: true, sortable: true, width: 20},
      {fieldInfo: phoneField, editable: true, sortable: true, width: 10},
      {fieldInfo: groupField, editable: true, sortable: true, width: 20},
      {fieldInfo: emailField, editable: true, sortable: true, width: 10},
      {fieldInfo: addressField, editable: true, sortable: true, width: 30},
      {fieldInfo: description, editable: true, sortable: true, width: 10}
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name', 'address']));
    return grid;
  }

  createModel(): Supplier {
        return new Supplier();
  }

  load(): Promise<Supplier[]> {
    return this.supplierService.getSuppliers()
      .then(suppliers => {
        return suppliers;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: Supplier, isEditing: boolean): Promise<Supplier> {
    return this.supplierService.saveSupplier(model, isEditing);
  }

  delete(item: Supplier): Promise<boolean> {
    return this.supplierService.deleteSupplier(item.id);
  }

}