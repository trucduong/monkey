import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopCmp } from './shop';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'shop', component: ShopCmp}
]);
