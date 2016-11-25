import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CustomerGroupCmp } from './group/group';

import { CustomerCmp } from './customer';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'customer-group', component: CustomerGroupCmp },
  { path: 'customer', component: CustomerCmp }
]);
