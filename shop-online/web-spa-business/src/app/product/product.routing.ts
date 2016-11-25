import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductGroupCmp } from './group/group';

import { ProductCmp } from './product';
import { ProductPricesCmp } from './prices/prices';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'product-group', component: ProductGroupCmp },
  { path: 'product', component: ProductCmp },
  { path: 'product-prices', component: ProductPricesCmp }
]);
