import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SupplierGroupCmp } from './group/group';
import { SupplierGroupDetailCmp } from './group/detail/detail';

import { SupplierCmp } from './supplier';
import { SupplierDetailCmp} from './detail/detail';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'supplier-group', component: SupplierGroupCmp },
  { path: 'supplier-group-detail/:id', component: SupplierGroupDetailCmp},
  { path: 'supplier', component: SupplierCmp },
  {path: 'supplier-detail/:id', component: SupplierDetailCmp }
]);
