import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductGroupCmp } from './group/group';
import { ProductGroupDetailCmp } from './group/detail/detail';

import { ProductCmp } from './product';
import { ProductDetailCmp} from './detail/detail';
import { ProductPricesCmp } from './prices/prices';
import { ProductPricesDetailCmp } from './prices/detail/detail';
import { ProductPricesUploadCmp } from './prices/upload/upload';


export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'product-group', component: ProductGroupCmp },
  { path: 'product-group-detail/:id', component: ProductGroupDetailCmp },
  { path: 'product', component: ProductCmp },
  { path: 'product-detail/:id', component: ProductDetailCmp },
  { path: 'product-prices', component: ProductPricesCmp },
  { path: 'product-prices-detail/:id', component: ProductPricesDetailCmp },
  { path: 'product-prices-upload', component: ProductPricesUploadCmp },
]);
