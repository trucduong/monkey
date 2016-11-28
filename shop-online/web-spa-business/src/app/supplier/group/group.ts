import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { CacheUtils, SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, TextAreaFieldInfo} from '../../shared/index';
import { SupplierGroup, SupplierService } from '../shared/index';

@Component({
  selector: 'supplier-group',
  templateUrl: 'src/app/supplier/group/group.html'
})
export class SupplierGroupCmp extends SmartListController<SupplierGroup> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private supplierService: SupplierService) {

    super(route, translate, router);
  }

  getCurrentUrl(): string {
    return '/supplier-group';
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'supplier.group.name', true, 0, 100);

    let description = new TextFieldInfo(this.getTranslator(), 'description', 'supplier.group.description', false, 0, 500)

    let columns: GridColumn[] = [
      { fieldInfo: nameField, editable: true, sortable: true, width: 40 },
      { fieldInfo: description, editable: true, sortable: true, width: 60 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name']));
    return grid;
  }

  createModel(): SupplierGroup {
    return new SupplierGroup();
  }

  load(): Promise<SupplierGroup[]> {
    return this.supplierService.getSupplierGroups()
      .then(items => {
        return items;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: SupplierGroup, isEditing: boolean): Promise<SupplierGroup> {
    CacheUtils.clear('supplier.group');
    return this.supplierService.saveSupplierGroup(model, isEditing);
  }

  delete(item: SupplierGroup): Promise<boolean> {
    return this.supplierService.deleteSupplierGroup(item.id)
      .then(id => {
        CacheUtils.clear('supplier.group');
        return Promise.resolve(true);
      });
  }

}