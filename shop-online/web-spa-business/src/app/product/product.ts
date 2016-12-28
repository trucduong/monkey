import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, CmbFieldInfo, NumberFieldInfo,
  CMB_FILTERS, ComboboxService, RefComboboxService } from './../shared/index';
import { Product, ProductService, RefProductGroupService } from './shared/index';

@Component({
  selector: 'product',
  templateUrl: 'src/app/product/product.html'
})

export class ProductCmp extends SmartListController<Product> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private productService: ProductService) {

    super(route, translate, router);

    // TODO: move to sidebar menu
    this.resetNavigation();
  }

  getCurrentUrl(): string {
    return '/product';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'product.name', true, 0, 100);

    let refUnitService = new RefComboboxService(CMB_FILTERS.UNIT.type, this.productService);
    let unitField = new CmbFieldInfo(this.getTranslator(), refUnitService, 'unit', 'ref.unit', true);

    let refProductGroupService = new RefProductGroupService(this.productService);
    let groupField = new CmbFieldInfo(this.getTranslator(), refProductGroupService, 'groupId', 'product.group', true);

    let description = new TextFieldInfo(this.getTranslator(), 'description', 'product.description', false, 0, 500)

    let refStatusService = new RefComboboxService(CMB_FILTERS.PRODUCT_STATUS.type, this.productService);
    let statusField = new CmbFieldInfo(this.getTranslator(), refStatusService, 'status', 'ref.product.status', true);

    let warningRemainingField = new NumberFieldInfo(this.getTranslator(), 'warningRemaining', 'product.warningRemaining', true, 0, 10000);

    let columns: GridColumn[] = [
      {fieldInfo: nameField, editable: true, sortable: true, width: 30},
      {fieldInfo: unitField, editable: true, sortable: true, width: 10},
      {fieldInfo: groupField, editable: true, sortable: true, width: 20},
      {fieldInfo: statusField, editable: true, sortable: true, width: 10},
      {fieldInfo: warningRemainingField, editable: true, sortable: true, width: 10},
      {fieldInfo: description, editable: true, sortable: true, width: 20}
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name']));
    return grid;
  }

  createModel(): Product {
        return new Product();
  }

  load(): Promise<Product[]> {
    return this.productService.getProducts()
      .then(products => {
        return products;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: Product, isEditing: boolean): Promise<Product> {
    return this.productService.saveProduct(model, isEditing);
  }

  delete(item: Product): Promise<boolean> {
    return this.productService.deleteProduct(item.id);
  }

}