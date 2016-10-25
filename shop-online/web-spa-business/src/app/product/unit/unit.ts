import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridHeader, SortInfo, FilterInfo } from '../../shared/index';
import { ProductService, Unit } from '../shared/index';

const headers: GridHeader[] = [
  { name: 'id', labelKey: 'unit.list.id', sortable: true, width: 20, translation: false },
  { name: 'name', labelKey: 'unit.list.name', sortable: true, width: 30, translation: false },
  { name: 'note', labelKey: 'common.list.note', sortable: true, width: 30, translation: false },

];

@Component({
  selector: 'product-unit',
  templateUrl: 'src/app/product/unit/unit.html'
})
export class UnitCmp extends ListController<Unit> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private unitService: ProductService) {

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

  load(): Promise<Unit[]> {
    return Promise.resolve(this.unitService.getUnits());
  }

  getCurrentUrl(): string {
    return '/product-unit';
  }

  getDetailUrl(): string {
    return '/product-unit-detail';
  }

}