import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridHeader, SortInfo, FilterInfo } from '../../shared/index';
import { CustomerService, CustomerGroup } from '../shared/index';

const headers: GridHeader[] = [
  { name: 'id', labelKey: 'customer.group.list.id', sortable: true, width: 20},
  { name: 'name', labelKey: 'customer.group.list.name', sortable: true, width: 30},
  { name: 'note', labelKey: 'common.list.note', sortable: true, width: 30},
  { name: 'quantity', labelKey: 'customer.group.list.quantity', sortable: true, width: 20}

];

@Component({
  selector: 'customer-group',
  templateUrl: 'src/app/customer/group/group.html'
})
export class CustomerGroupCmp extends ListController<CustomerGroup> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private customerService: CustomerService) {

    super(route, translate, router);
  }

  getHeaders(): GridHeader[] {
    return headers;
  }

  getDefaultSort(): SortInfo {
    return new SortInfo('name', 'asc');
  }

  getDefaultFilter(): FilterInfo {
    return new FilterInfo(['name', 'note']);
  }

  load(): Promise<CustomerGroup[]> {
    return Promise.resolve(this.customerService.getCustomerGroups());
  }

  getCurrentUrl(): string {
    return '/customer-group';
  }

  getDetailUrl(): string {
    return '/customer-group-detail';
  }

}