import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, CmbFieldInfo, NumberFieldInfo, EmailFieldInfo,
  CMB_FILTERS, ComboboxService, RefComboboxService } from './../shared/index';
import { Customer, CustomerService, RefCustomerGroupService } from './shared/index';

@Component({
  selector: 'customer',
  templateUrl: 'src/app/customer/customer.html'
})

export class CustomerCmp extends SmartListController<Customer> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private customerService: CustomerService) {

    super(route, translate, router);

    // TODO: move to sidebar menu
    this.resetNavigation();
  }

  getCurrentUrl(): string {
    return '/customer';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    // map.set('customer.group', new RefCustomerGroupService(this.customerService));
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'customer.name', true, 0, 100);

    let phoneField = new TextFieldInfo(this.getTranslator(), 'phone', 'customer.phone', true, 0, 20);
    
    let refSexService = new RefComboboxService(CMB_FILTERS.SEX.type, this.customerService);
    let sexField = new CmbFieldInfo(this.getTranslator(), refSexService, 'sex', 'ref.sex', true);

    let emailField = new EmailFieldInfo(this.getTranslator(), 'email', 'customer.email', false, 0, 100);

    // TODO: replace this by AddressField
    let addressField = new TextFieldInfo(this.getTranslator(), 'address', 'address.addressDetail', false, 0, 200)

    let refCustomerGroupService = new RefCustomerGroupService(this.customerService);
    let groupField = new CmbFieldInfo(this.getTranslator(), refCustomerGroupService, 'groupId', 'customer.group', true);

    let description = new TextFieldInfo(this.getTranslator(), 'description', 'customer.description', false, 0, 500)

    let columns: GridColumn[] = [
      {fieldInfo: nameField, editable: true, sortable: true, width: 20},
      {fieldInfo: phoneField, editable: true, sortable: true, width: 10},
      {fieldInfo: groupField, editable: true, sortable: true, width: 20},
      {fieldInfo: sexField, editable: true, sortable: true, width: 10},
      {fieldInfo: emailField, editable: true, sortable: true, width: 10},
      {fieldInfo: addressField, editable: true, sortable: true, width: 20},
      {fieldInfo: description, editable: true, sortable: true, width: 10}
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name', 'address']));
    return grid;
  }

  createModel(): Customer {
        return new Customer();
  }

  load(): Promise<Customer[]> {
    return this.customerService.getCustomers()
      .then(customers => {
        return customers;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: Customer, isEditing: boolean): Promise<Customer> {
    return this.customerService.saveCustomer(model, isEditing);
  }

  delete(item: Customer): Promise<boolean> {
    return this.customerService.deleteCustomer(item.id);
  }

}