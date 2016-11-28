import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  TextFieldInfo, CmbFieldInfo, NumberFieldInfo, EmailFieldInfo, DateFieldInfo,
  CMB_FILTERS, ComboboxService, RefComboboxService } from './../shared/index';
import { Employee, EmployeeService } from './shared/index';

@Component({
  selector: 'employee',
  templateUrl: 'src/app/employee/employee.html'
})

export class EmployeeCmp extends SmartListController<Employee> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private employeeService: EmployeeService) {

    super(route, translate, router);

    // TODO: move to sidebar menu
    this.resetNavigation();
  }

  getCurrentUrl(): string {
    return '/employee';
  }

  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'name', 'employee.name', true, 0, 100);

    let titleField = new TextFieldInfo(this.getTranslator(), 'title', 'employee.title', true, 0, 100);

    let phoneField = new TextFieldInfo(this.getTranslator(), 'phone', 'employee.phone', true, 0, 20);
    
    let refSexService = new RefComboboxService(CMB_FILTERS.SEX.type, this.employeeService);
    let sexField = new CmbFieldInfo(this.getTranslator(), refSexService, 'sex', 'ref.sex', true);

    let emailField = new EmailFieldInfo(this.getTranslator(), 'email', 'employee.email', false, 0, 100);

    let birthField = new DateFieldInfo(this.getTranslator(), 'birthDate', 'employee.birthDate', false, null, new Date());

    let refWorkStatusService = new RefComboboxService(CMB_FILTERS.EMPLOYEE_STATUS.type, this.employeeService);
    let workingStatusField = new CmbFieldInfo(this.getTranslator(), refWorkStatusService, 'workingStatus', 'ref.employee.status', true);

    // TODO: replace this by AddressField
    let addressField = new TextFieldInfo(this.getTranslator(), 'addressDetail', 'address.addressDetail', false, 0, 200)

    let columns: GridColumn[] = [
      {fieldInfo: nameField, editable: true, sortable: true, width: 20},
      {fieldInfo: titleField, editable: true, sortable: true, width: 20},
      {fieldInfo: phoneField, editable: true, sortable: true, width: 10},
      {fieldInfo: sexField, editable: true, sortable: true, width: 10},
      {fieldInfo: emailField, editable: true, sortable: true, width: 10},
      {fieldInfo: birthField, editable: true, sortable: true, width: 10},
      {fieldInfo: workingStatusField, editable: true, sortable: true, width: 10},
      {fieldInfo: addressField, editable: true, sortable: true, width: 10}
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['name', 'addressDetail']));
    return grid;
  }

  createModel(): Employee {
        return new Employee();
  }

  load(): Promise<Employee[]> {
    return this.employeeService.getEmployees()
      .then(employees => {
        return employees;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: Employee, isEditing: boolean): Promise<Employee> {
    return this.employeeService.saveEmployee(model, isEditing);
  }

  delete(item: Employee): Promise<boolean> {
    return this.employeeService.deleteEmployee(item.id);
  }

}