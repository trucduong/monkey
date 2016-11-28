import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SERVICES, BaseHttpService } from '../../../shared/index';

import { Permission } from '../models/permission';
import { UserAccount } from '../models/user.account';

@Injectable()
export class AuthService extends BaseHttpService {
    constructor(http: Http) {
        super(http);
    }

    /**
     * UserAccount
     */
    getUserAccounts() {
        return this.get(SERVICES.URLS.user_account, SERVICES.ACTIONS.READ_ALL, []);
    }

    getUserAccount(id: string) {
        return this.get(SERVICES.URLS.user_account, SERVICES.ACTIONS.READ, [id]);
    }

    saveUserAccount(item: UserAccount, isEditing: boolean) {
        if (isEditing) {
            return this.post(SERVICES.URLS.user_account, SERVICES.ACTIONS.UPDATE, item, [item.id]);
        } else {
            return this.post(SERVICES.URLS.user_account, SERVICES.ACTIONS.CREATE, item, [])
        }
    }

    deleteUserAccount(id: string) {
        return this.post(SERVICES.URLS.user_account, SERVICES.ACTIONS.DELETE, {}, [id]);
    }

    updatePassword(name: string, oldPass: string, newPass: string) {
        return this.post(SERVICES.URLS.user_account, SERVICES.ACTIONS.UPDATE_PASSWORD, {oldPassword: oldPass, newPassword: newPass}, [name]);
    }

    updatePermission(name: string, permissions: string) {
        return this.post(SERVICES.URLS.user_account, SERVICES.ACTIONS.UPDATE_PERMISSION, permissions, [name]);
    }

    getPermissions() {
        return this.get(SERVICES.URLS.auth, SERVICES.ACTIONS.READ_ALL_PERMISSION, []);
    }
}