import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopCmp } from './shop';
import { SellCmp } from './sell/sell';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'shop', component: ShopCmp},
  { path: 'sell', component: SellCmp}
]);
