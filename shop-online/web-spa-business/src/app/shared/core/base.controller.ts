import { Router, NavigationExtras } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { AlertInfo } from '../alert/alert.info';
import { AlertType } from '../alert/alert.type';
import { WrapperInfo, NAVIGATOR_INFO } from '../../shared/index';

/**
 * BaseController
 */
export abstract class BaseController {
    private pageInfo: WrapperInfo
    private alertInfo: AlertInfo[];

    constructor(private router: Router, private translate: TranslateService) {
        translate.setDefaultLang('vi');
        translate.use('vi');
        this.pageInfo = new WrapperInfo(false);
        this.alertInfo = [];
    }

    abstract getCurrentUrl(): string;

    getTranslator(): TranslateService {
        return this.translate;
    }

    translateText(text: string) {
        return this.getTranslator().getTranslation(text).toPromise();
    }

    navigateTo(url: any[], extras?: NavigationExtras) {
        NAVIGATOR_INFO.push(this.getCurrentUrl());
        this.router.navigate(url, extras);
    }

    navigateBack(extras?: NavigationExtras) {
        let url = NAVIGATOR_INFO.pop();
        this.router.navigate([url], extras);
    }

    showLoading() {
        this.pageInfo.isLoading = true;
    }

    hideLoading() {
        this.pageInfo.isLoading = false;
    }

    alert(alertType: AlertType, message: string) {
        this.alertInfo.push(new AlertInfo(AlertType[alertType], message));
    }

    clearAlert() {
        this.alertInfo = [];
    }

    onBack() {
        this.navigateBack();
    }

    onNavigate(url: string) {
        this.navigateTo([url]);
    }
}