import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginCmp } from './login/login';
import { UserAccountCmp } from './account/account';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'login', component: LoginCmp },
  { path: 'account', component: UserAccountCmp }
]);
