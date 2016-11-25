import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { routing } from './employee.routing';
import { EmployeeCmp } from './employee';
import { EmployeeDetailCmp } from './detail/detail';
import {EmployeeService} from './shared/index';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    EmployeeCmp,
    EmployeeDetailCmp
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
