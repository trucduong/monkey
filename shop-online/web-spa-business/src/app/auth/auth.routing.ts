import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginCmp } from './login/login';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'login', component: LoginCmp }
]);
