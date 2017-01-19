import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import {LoginModel, AuthService} from '../shared/index';
import {BaseController, AlertType, LocalStorageService} from '../../shared/index';

@Component({
  selector: 'auth',
  templateUrl: 'src/app/auth/login/login.html',
  styleUrls: ['src/app/auth/login/login.css']
})
export class LoginCmp extends BaseController {
  private loginModel: LoginModel;

  constructor(router: Router,
    translate: TranslateService,
    private authService: AuthService,
    private storageService: LocalStorageService) {
    super(router, translate);
    this.loginModel = new LoginModel();
  }

  getCurrentUrl(): string {
    return '/login';
  }

  login() {
    let mthis = this;
    mthis.authService.login(mthis.loginModel.loginName, mthis.loginModel.password)
      .then(user => {
        mthis.storageService.set('AUTH_TOKEN', user.authToken);
        mthis.storageService.set('AUTH_USER', user);

        mthis.navigateTo(['/blank']);
      })
      .catch(err => {
        mthis.alert(AlertType.danger, err.msg);
      });
  }

  onEnterLogin(event: any) {
    if (event.target.value == 'Enter') {
      if (this.loginModel.loginName && this.loginModel.loginName.length > 0
        && this.loginModel.password && this.loginModel.password.length > 0) {
        this.login();
      }
    }
  }
}
