import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridHeader, SortInfo, FilterInfo, AlertType } from '../../shared/index';
import { ProductService, ProductGroup } from '../shared/index';

const headers: GridHeader[] = [
  //{ name: 'id', labelKey: 'product.group.id', sortable: true, width: 20},
  { name: 'name', labelKey: 'product.group.name', sortable: true, width: 50},
  { name: 'description', labelKey: 'product.group.description', sortable: true, width: 50},
];

@Component({
  selector: 'product-group',
  templateUrl: 'src/app/product/group/group.html'
})
export class ProductGroupCmp extends ListController<ProductGroup> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private productService: ProductService) {

    super(route, translate, router);
  }

  getHeaders(): GridHeader[] {
    return headers;
  }

  getDefaultSort(): SortInfo {
    return new SortInfo('name', 'asc');
  }

  getDefaultFilter(): FilterInfo {
    return new FilterInfo(['name', 'description']);
  }

  load(): Promise<ProductGroup[]> {
    return Promise.resolve(this.productService.getProductGroups());
  }

  getCurrentUrl(): string {
    return '/product-group';
  }

  getDetailUrl(): string {
    return '/product-group-detail';
  }

  delete(item: ProductGroup): Promise<boolean> {
    return this.productService.deleteProductGroup(item[this.idColumnName])
      .then(id => {
        return Promise.resolve(true);
      })
      .catch(error => {
        this.translateText(error).then(message => {
          this.alert(AlertType.danger, message);
          return Promise.resolve(false);
        })
      });
  }

}