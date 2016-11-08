import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridHeader, SortInfo, FilterInfo, AlertType, ComboboxService, RefComboboxService } from './../shared/index';
import { Product, ProductService, RefProductGroupService } from './shared/index';

const headers: GridHeader[] = [
  //{ name: 'id', labelKey: 'common.id', sortable: true, width: 5},
  //{ name: 'code', labelKey: 'common.code', sortable: true, width: 10},
  { name: 'name', labelKey: 'product.name', sortable: true, width: 30 },
  { name: 'unit', labelKey: 'ref.unit', sortable: true, width: 10 },
  { name: 'group', labelKey: 'product.group', sortable: true, width: 20 },
  { name: 'status', labelKey: 'ref.product.status', sortable: true, width: 10 },
  { name: 'warningRemaining', labelKey: 'product.warningRemaining', sortable: true, width: 10 },
  { name: 'description', labelKey: 'product.description', sortable: true, width: 20 },
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

    // TODO: move to sidebar menu
    this.resetNavigation();
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

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    let cmbService = new RefComboboxService(this.productService);
    map.set('product.group', new RefProductGroupService(this.productService));
    return map;
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