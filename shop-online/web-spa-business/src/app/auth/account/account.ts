import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import { SmartListController, SmartGridInfo, GridColumn, GridOption, SortInfo, FilterInfo, AlertType,
  GridAction, TextFieldInfo, CmbFieldInfo, DialogInfo, DialogService, FormInfo, Error, PasswordFieldInfo,
  CMB_FILTERS, ComboboxService, RefComboboxService } from '../../shared/index';
import { UserAccount, AuthService, Permission } from '../shared/index';

import { RefEmployeeService } from '../../employee/index';

@Component({
  selector: 'account',
  templateUrl: 'src/app/auth/account/account.html'
})

export class UserAccountCmp extends SmartListController<UserAccount> implements OnInit {
  private changePassDialog: DialogInfo;
  private changePassForm: FormInfo;

  private permissionDialog: DialogInfo;
  private permissionModel: {group: string, permissions: Permission[]}[];
  private currentUser: UserAccount;

  constructor(
    route: ActivatedRoute,
    router: Router,
    translate: TranslateService,
    private accountService: AuthService,
    private dialogService: DialogService) {

    super(route, translate, router);

    this.changePassDialog = new DialogInfo();
    this.permissionDialog = new DialogInfo();
    this.permissionModel = [];

    // TODO: move to sidebar menu
    this.resetNavigation();
  }

  getCurrentUrl(): string {
    return '/account';
  }

  getActions(): GridAction[] {
    return [{ name: "change_permission", icon: "fa fa-list-ol", type: "btn-default" },
      { name: "change_password", icon: "fa fa-key", type: "btn-info" }];
  }

  private refEmployeeService: RefEmployeeService;
  private getRefEmployeeService() {
    if (!this.refEmployeeService) {
      this.refEmployeeService = new RefEmployeeService(this.accountService)
    }
    return this.refEmployeeService;
  }

  private refAccountStatusService: RefComboboxService;
  private getRefAccountStatusService() {
    if (!this.refAccountStatusService) {
      this.refAccountStatusService = new RefComboboxService(CMB_FILTERS.ACCOUNT_STATUS.type, this.accountService);
    }

    return this.refAccountStatusService;
  }


  getTranslateServices(): Map<string, ComboboxService> {
    let map = new Map<string, ComboboxService>();
    map.set('account.employee', this.getRefEmployeeService());
    return map;
  }

  build(): SmartGridInfo {
    let option = new GridOption(false, true, true, true);

    let nameField = new TextFieldInfo(this.getTranslator(), 'loginName', 'account.name', true, 0, 100);

    let employeeField = new CmbFieldInfo(this.getTranslator(), this.getRefEmployeeService(), 'employeeId', 'account.employee', true);

    let statusField = new CmbFieldInfo(this.getTranslator(), this.getRefAccountStatusService(), 'status', CMB_FILTERS.ACCOUNT_STATUS.type, true);

    let columns: GridColumn[] = [
      { fieldInfo: nameField, editable: false, sortable: true, width: 30 },
      { fieldInfo: employeeField, editable: true, sortable: true, width: 30 },
      { fieldInfo: statusField, editable: true, sortable: true, width: 20 }
    ];

    let grid = new SmartGridInfo(option, columns, [], new SortInfo('name', 'asc'), new FilterInfo(['loginName']));
    return grid;
  }

  createModel(): UserAccount {
    return new UserAccount();
  }

  load(): Promise<UserAccount[]> {
    return this.accountService.getUserAccounts()
      .then(accounts => {
        return accounts;
      })
      .catch(error => {
        this.log(error);
        return [];
      });
  }

  save(model: UserAccount, isEditing: boolean): Promise<UserAccount> {
    return this.accountService.saveUserAccount(model, isEditing);
  }

  delete(item: UserAccount): Promise<boolean> {
    return this.accountService.deleteUserAccount(item.id);
  }

  execute(param: any) {
    if (param.action == 'change_password') {
      this.changePassForm = this.createChangePassForm(param.data);
      this.dialogService.show(this.changePassDialog);
    } else if (param.action == 'change_permission') {
      this.loadPermissionDialog(param.data);
    }
  }

  closeDialog(dialog: DialogInfo) {
    this.dialogService.hide(dialog);
  }

  createChangePassForm(user: UserAccount) {
    let mthis = this;
    let model = {loginName:user.loginName, oldPassword: '', newPassword: '', reNewPassword: '' };
    let form = new FormInfo(this.getTranslator(), model, user.loginName);
    form.addField(new PasswordFieldInfo(this.getTranslator(), 'oldPassword', 'account.password', true, 0, 100));
    form.addField(new PasswordFieldInfo(this.getTranslator(), 'newPassword', 'account.password.new', true, 0, 100));
    let rePassField = new PasswordFieldInfo(this.getTranslator(), 'reNewPassword', 'account.password.new.re', true, 0, 100)
    rePassField.addValidator({
      validate(obj: any) {
        let item = mthis.changePassForm.model;
        if (obj && item['newPassword'] && obj != item['newPassword']) {
          return new Error('account.validator.error.password.not.match', []);
        }
        return null;
      }
    });
    form.addField(rePassField);

    return form;
  }

  onChangePass() {
    this.showLoading();
    // validate
    if (!this.changePassForm.validate({})) {
      // this.showErrorMessage({ key: "common.validator.error", params: [] });
      return;
    }

    // save
    let model = this.changePassForm.model;
    this.accountService.updatePassword(model['loginName'], model['oldPassword'], model['newPassword'])
      .then(item => {
        this.hideLoading();
        this.closeDialog(this.changePassDialog);
        this.alert(AlertType.success, 'common.alert.content.update.success');
      })
      .catch(error => {
        this.showErrorMessage({ key: error, params: [] });
        this.hideLoading();
      });
  }


  loadPermissionDialog(user: UserAccount) {
    let mthis = this;
    mthis.showLoading();
    mthis.permissionModel = [];
    mthis.currentUser = user;
    
    let userPermissions: string[] = [];
    if (user.permissions) {
      userPermissions = user.permissions.split(',');
    }

    // load
    mthis.accountService.getPermissions().then(res => {
      let permissions: Permission[] = res;
      let maps = new Map<string, Permission[]>();
      permissions.forEach(permission => {
        permission.selected = (userPermissions.indexOf(permission.name) > -1);

        let group = maps.get(permission.groupName);
        if (group) {
          group.push(permission);
        } else {
          group = [permission];
          maps.set(permission.groupName, group);
        }
      });

      maps.forEach((value, key, map) => {
        mthis.permissionModel.push({group: key, permissions: value});
      });

      mthis.hideLoading();
      mthis.dialogService.show(mthis.permissionDialog)
    })
    .catch(error => {
      this.hideLoading();
      this.showErrorMessage({ key: error, params: [] });
    });
  }
  
  onChangePermission() {
    let mthis = this;
    let permissions: string[] = [];
    mthis.permissionModel.forEach(item => {
      item.permissions.forEach(permission => {
        if(permission.selected) {
          permissions.push(permission.name);
        }
      })
    });

    let permissionStr: string = permissions.join(',');
    mthis.accountService.updatePermission(mthis.currentUser.loginName, permissionStr)
    .then(item => {
        mthis.currentUser.permissions = permissionStr;
        mthis.hideLoading();
        mthis.closeDialog(mthis.permissionDialog);
        mthis.alert(AlertType.success, 'common.alert.content.update.success');
      })
      .catch(error => {
        mthis.showErrorMessage({ key: error, params: [] });
        mthis.hideLoading();
      });
  }
}