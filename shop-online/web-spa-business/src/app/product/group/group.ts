import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, TextAreaFieldInfo} from '../../shared/index';
import { ProductGroup, ProductService } from '../shared/index';

@Component({
  selector: 'product-group',
  templateUrl: 'src/app/product/group/group.html'
})
export class ProductGroupCmp extends SmartListController<ProductGroup> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private productService: ProductService) {

    super(route, translate, router);
  }

  getCurrentUrl(): string {
    return '/product-group';
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'product.group.name', true, 0, 100);

    let description = new TextFieldInfo(this.getTranslator(), 'description', 'product.group.description', false, 0, 500)

    let columns: GridColumn[] = [
      { fieldInfo: nameField, editable: true, sortable: true, width: 40 },
      { fieldInfo: description, editable: true, sortable: true, width: 60 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name']));
    return grid;
  }

  createModel(): ProductGroup {
    return new ProductGroup();
  }

  load(): Promise<ProductGroup[]> {
    return this.productService.getProductGroups()
      .then(items => {
        return items;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: ProductGroup, isEditing: boolean): Promise<ProductGroup> {
    return this.productService.saveProductGroup(model, isEditing);
  }

  delete(item: ProductGroup): Promise<boolean> {
    return this.productService.deleteProductGroup(item.id);
  }

}