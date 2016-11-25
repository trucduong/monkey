import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SupplierGroupCmp } from './group/group';

import { SupplierCmp } from './supplier';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'supplier-group', component: SupplierGroupCmp },
  { path: 'supplier', component: SupplierCmp },
]);
