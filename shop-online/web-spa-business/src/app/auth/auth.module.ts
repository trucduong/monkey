import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SharedModule } from '../shared/index';

import { LoginCmp } from './login/login';
import { routing } from './auth.routing';
import { AuthService } from './shared/index';
import { UserAccountCmp } from './account/account';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    LoginCmp,
    UserAccountCmp
  ],
  providers: [
      AuthService
  ]
})
export class AuthModule {}
