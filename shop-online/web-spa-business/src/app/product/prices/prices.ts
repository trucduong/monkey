import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo,
  TextFieldInfo, CmbFieldInfo, NumberFieldInfo,
  CMB_FILTERS, ComboboxService } from '../../shared/index';
import { ProductService, RefProductGroupService, Product } from '../shared/index';

@Component({
  selector: 'product-prices',
  templateUrl: 'src/app/product/prices/prices.html'
})
export class ProductPricesCmp extends SmartListController<Product> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private productService: ProductService) {

    super(route, translate, router);
  }

  getCurrentUrl(): string {
    return '/product-prices';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    map.set('product.group', new RefProductGroupService(this.productService));
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, false, true, false);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'product.name', true, 0, 100);

    let refProductGroupService = new RefProductGroupService(this.productService);
    let groupField = new CmbFieldInfo(this.getTranslator(), refProductGroupService, 'group', 'product.group', true);

    let remainingField = new NumberFieldInfo(this.getTranslator(), 'remaining', 'product.remaining', true, 0, 0);
    let discountField = new NumberFieldInfo(this.getTranslator(), 'discount', 'product.discount', true, 0, 100);
    let inputPriceField = new NumberFieldInfo(this.getTranslator(), 'inputPrice', 'product.inputPrice', true, 0, 0, 1000);
    let wholesalePriceField = new NumberFieldInfo(this.getTranslator(), 'wholesalePrice', 'product.wholesalePrice', true, 0, 0, 1000);
    let retailPriceField = new NumberFieldInfo(this.getTranslator(), 'retailPrice', 'product.retailPrice', true, 0, 0, 1000);

    let columns: GridColumn[] = [
      { fieldInfo: nameField, editable: false, sortable: true, width: 30 },
      { fieldInfo: groupField, editable: false, sortable: true, width: 20 },
      { fieldInfo: remainingField, editable: true, sortable: true, width: 20 },
      { fieldInfo: discountField, editable: true, sortable: true, width: 20 },
      { fieldInfo: inputPriceField, editable: true, sortable: true, width: 20 },
      { fieldInfo: wholesalePriceField, editable: true, sortable: true, width: 20 },
      { fieldInfo: retailPriceField, editable: true, sortable: true, width: 20 },
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name']));
    return grid;
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

  save(model: Product, isEditing: boolean): Promise<Product> {
    return this.productService.saveProductDetail(model);
  }

  downloadPrices() {
    this.productService.downloadPrices();
    // this.showLoading();
    // this.productService.downloadPrices()
    //   .then(res => {
    //     window.open(window.URL.createObjectURL(res));
    //     this.hideLoading();
    //   })
    //   .catch(err => {
    //     this.hideLoading();
    //     this.showErrorMessage({ key: 'download error', params: [] });
    //   });
  }
}