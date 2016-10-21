import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlankCmp } from './blank';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'blank', component: BlankCmp}
]);
