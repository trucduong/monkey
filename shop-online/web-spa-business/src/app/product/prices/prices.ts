import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { ListController, GridAction, GridHeader, SortInfo, FilterInfo, AlertType, ComboboxService, RefComboboxService } from '../../shared/index';
import { ProductService, RefProductGroupService, Product } from '../shared/index';

const headers: GridHeader[] = [
  //{ name: 'code', labelKey: 'product.code', sortable: true, width: 10},
  { name: 'name', labelKey: 'product.name', sortable: true, width: 20 },
  { name: 'group', labelKey: 'product.group', sortable: true, width: 20 },
  { name: 'remaining', labelKey: 'product.remaining', sortable: true, width: 10 },
  { name: 'discount', labelKey: 'product.discount', sortable: true, width: 10 },
  { name: 'inputPrice', labelKey: 'product.inputPrice', sortable: true, width: 15 },
  { name: 'wholesalePrice', labelKey: 'product.wholesalePrice', sortable: true, width: 15 },
  { name: 'retailPrice', labelKey: 'product.retailPrice', sortable: true, width: 15 }
];

@Component({
  selector: 'product-prices',
  templateUrl: 'src/app/product/prices/prices.html'
})

export class ProductPricesCmp extends ListController<Product> implements OnInit {
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
    return new FilterInfo(['name']);
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    map.set('product.group', new RefProductGroupService(this.productService));
    return map;
  }

  load(): Promise<any> {
    return this.productService.getProductsWithDetails()
      .then(products => {
        return products;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  getCurrentUrl(): string {
    return '/product-prices';
  }

  getDetailUrl(): string {
    return '/product-prices-detail';
  }

  getActions(): GridAction[] {
        let actions: GridAction[] = [
            { name: 'edit', type: 'btn-warning', icon: 'fa fa-pencil' }
        ];
        return actions;
    }

}