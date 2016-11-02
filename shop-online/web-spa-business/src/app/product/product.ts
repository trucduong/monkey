import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridHeader, SortInfo, FilterInfo, AlertType } from './../shared/index';
import { Product } from './shared/index';
import { ProductService} from './shared/index';

const headers: GridHeader[] = [
  //{ name: 'id', labelKey: 'common.list.id', sortable: true, width: 5, translation: false },
  //{ name: 'code', labelKey: 'common.list.code', sortable: true, width: 10, translation: false },
  { name: 'name', labelKey: 'product.list.name', sortable: true, width: 30, translation: false },
  { name: 'unit', labelKey: 'common.list.unit', sortable: true, width: 10, translation: true },
  { name: 'group', labelKey: 'product.list.group', sortable: true, width: 20, translation: false },
  { name: 'status', labelKey: 'common.list.status', sortable: true, width: 10, translation: false },
  { name: 'warningRemaining', labelKey: 'product.list.warningRemaining', sortable: true, width: 10, translation: false },
  { name: 'description', labelKey: 'product.list.description', sortable: true, width: 20, translation: false },
];

@Component({
  selector: 'product',
  templateUrl: 'src/app/product/product.html'
})

export class ProductCmp extends ListController<Product> implements OnInit {
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
    //return new FilterInfo(['code', 'name']);
    return new FilterInfo(['name']);
  }

  load(): Promise<any> {
    return this.productService.getProducts()
      .then(products => {
        return products;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  getCurrentUrl(): string {
    return '/product';
  }

  getDetailUrl(): string {
    return '/product-detail';
  }
  
  delete(item: Product): Promise<boolean> {
    return this.productService.deleteProduct(item[this.idColumnName])
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