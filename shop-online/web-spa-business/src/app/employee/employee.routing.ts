import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeCmp } from './employee';
import { EmployeeDetailCmp } from './detail/detail';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'employee-detail', component: EmployeeDetailCmp },
  { path: 'employee', component: EmployeeCmp }
]);
