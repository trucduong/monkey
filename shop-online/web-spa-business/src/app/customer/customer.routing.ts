import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CustomerGroupCmp } from './group/group';
import { CustomerGroupDetailCmp } from './group/detail/detail';

import { CustomerCmp } from './customer';
import { CustomerDetailCmp} from './detail/detail';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'customer-group', component: CustomerGroupCmp },
  { path: 'customer-group-detail/:id', component: CustomerGroupDetailCmp},
  { path: 'customer', component: CustomerCmp },
  {path: 'customer-detail/:id', component: CustomerDetailCmp }
]);
