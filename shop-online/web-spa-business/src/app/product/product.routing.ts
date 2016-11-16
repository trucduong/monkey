import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductGroupCmp } from './group/group';

import { ProductCmp } from './product';
import { ProductPricesCmp } from './prices/prices';
import { ProductPricesDetailCmp } from './prices/detail/detail';
import { ProductPricesUploadCmp } from './prices/upload/upload';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'product-group', component: ProductGroupCmp },
  { path: 'product', component: ProductCmp },
  { path: 'product-prices', component: ProductPricesCmp },
  { path: 'product-prices-detail/:id', component: ProductPricesDetailCmp },
  { path: 'product-prices-upload', component: ProductPricesUploadCmp },
]);
