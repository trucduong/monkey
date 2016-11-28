import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { CacheUtils, SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, TextAreaFieldInfo} from '../../shared/index';
import { CustomerGroup, CustomerService } from '../shared/index';

@Component({
  selector: 'customer-group',
  templateUrl: 'src/app/customer/group/group.html'
})
export class CustomerGroupCmp extends SmartListController<CustomerGroup> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private customerService: CustomerService) {

    super(route, translate, router);
  }

  getCurrentUrl(): string {
    return '/customer-group';
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'customer.group.name', true, 0, 100);

    let description = new TextFieldInfo(this.getTranslator(), 'description', 'customer.group.description', false, 0, 500)

    let columns: GridColumn[] = [
      { fieldInfo: nameField, editable: true, sortable: true, width: 40 },
      { fieldInfo: description, editable: true, sortable: true, width: 60 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name']));
    return grid;
  }

  createModel(): CustomerGroup {
    return new CustomerGroup();
  }

  load(): Promise<CustomerGroup[]> {
    return this.customerService.getCustomerGroups()
      .then(items => {
        return items;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: CustomerGroup, isEditing: boolean): Promise<CustomerGroup> {
    CacheUtils.clear('customer.group');
    return this.customerService.saveCustomerGroup(model, isEditing);
  }

  delete(item: CustomerGroup): Promise<boolean> {
    return this.customerService.deleteCustomerGroup(item.id)
      .then(id => {
        CacheUtils.clear('customer.group');
        return Promise.resolve(true);
      });
  }

}