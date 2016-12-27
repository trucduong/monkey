import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo,
  TextFieldInfo, CmbFieldInfo, NumberFieldInfo, DateFieldInfo, AlertType,
  CMB_FILTERS, ComboboxService, RefComboboxService } from '../../shared/index';
import { EmployeeService, Employee } from '../shared/index';

@Component({
  selector: 'employee-detail',
  templateUrl: 'src/app/employee/detail/detail.html'
})

export class EmployeeDetailCmp extends SmartListController<Employee> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private employeeService: EmployeeService) {

    super(route, translate, router);
  }

  getCurrentUrl(): string {
    return '/employee';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, false, true, false );

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'employee.name', true, 0, 100);

    let titleField = new TextFieldInfo(this.getTranslator(), 'title', 'employee.title', true, 0, 100);

    let phoneField = new TextFieldInfo(this.getTranslator(), 'phone', 'employee.phone', true, 0, 20);

    let refSexService = new RefComboboxService(CMB_FILTERS.SEX.type, this.employeeService);
    let sexField = new CmbFieldInfo(this.getTranslator(), refSexService, 'sex', 'ref.sex', true);

    let faceAmountField = new NumberFieldInfo(this.getTranslator(), 'faceAmount', 'employee.faceAmount', false, 0, 10000000000, 1000000);

    let joinDateField = new DateFieldInfo(this.getTranslator(), 'joinDate', 'employee.joinDate', true);

    let columns: GridColumn[] = [
      { fieldInfo: nameField, editable: false, sortable: true, width: 20 },
      { fieldInfo: titleField, editable: false, sortable: true, width: 20 },
      { fieldInfo: phoneField, editable: false, sortable: true, width: 10 },
      { fieldInfo: sexField, editable: false, sortable: true, width: 10 },
      { fieldInfo: faceAmountField, editable: true, sortable: true, width: 10 },
      { fieldInfo: joinDateField, editable: true, sortable: true, width: 10 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name', 'address']));
    return grid;
  }

  createModel(): Employee {
    return new Employee();
  }

  load(): Promise<Employee[]> {
    return this.employeeService.getEmployeeWithDetails()
      .then(employees => {
        return employees;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: Employee, isEditing: boolean): Promise<Employee> {
    return this.employeeService.saveEmployeeDetail(model);
  }
}