import { Router, NavigationExtras } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import { AlertInfo, AlertType, WrapperInfo, NAVIGATOR_INFO, AlertDialogInfo, 
    DialogButton, DIALOG_ACTIONS, DialogListener, CommonUtils } from '../../shared/index';

/**
 * BaseController
 */
export abstract class BaseController {
    private pageInfo: WrapperInfo
    private alertInfo: AlertInfo[];

    constructor(private router: Router, private translate: TranslateService) {
        translate.setDefaultLang('vi');
        translate.use('vi');
        this.pageInfo = new WrapperInfo(false, null);
        this.alertInfo = [];
    }

    abstract getCurrentUrl(): string;

    /**
     * Translator
     */
    getTranslator(): TranslateService {
        return this.translate;
    }

    translateText(text: string) {
        return this.getTranslator().get(text).toPromise();
    }

    /**
     * Navivation
     */
    navigateTo(url: any[], extras?: NavigationExtras) {
        NAVIGATOR_INFO.push(this.getCurrentUrl());
        this.router.navigate(url, extras);
    }

    navigateBack(extras?: NavigationExtras) {
        let url = NAVIGATOR_INFO.pop();
        this.router.navigate([url], extras);
    }

    onBack() {
        this.navigateBack();
    }

    onNavigate(url: string) {
        this.navigateTo([url]);
    }


    /**
     * Loading
     */
    showLoading() {
        this.pageInfo.isLoading = true;
    }

    hideLoading() {
        this.pageInfo.isLoading = false;
    }


    /**
     * Alert
     */
    alert(alertType: AlertType, message: string) {
        this.alertInfo.push(new AlertInfo(AlertType[alertType], message));
    }

    clearAlert() {
        this.alertInfo = [];
    }

    /**
     * Message box
     */
    showMessage(title: string, message: any, actions: DialogButton[], listener: DialogListener) {
        this.hideLoading();
        
        this.translateText(message.key).then(msg => {
            if (message.params) {
                msg = CommonUtils.formatStr(msg, message.params);
            }
            this.pageInfo.dialog = new AlertDialogInfo(title, msg, actions, listener);
            this.pageInfo.dialog.isShow = true;
        });
    }

    showQuestionMessage(message: any, listener?: DialogListener) {
        this.showMessage('common.alert.title.question', message, [DIALOG_ACTIONS.YES, DIALOG_ACTIONS.NO], listener);
    }

    showConfirmMessage(message: any, listener?: DialogListener) {
        this.showMessage('common.alert.title.confirm', message, [DIALOG_ACTIONS.OK, DIALOG_ACTIONS.CANCEL], listener);
    }

    showInfoMessage(message: any, listener?: DialogListener) {
        this.showMessage('common.alert.title.info', message, [DIALOG_ACTIONS.CLOSE], listener);
    }

    showErrorMessage(message: any, listener?: DialogListener) {
        this.showMessage('common.alert.title.error', message, [DIALOG_ACTIONS.CLOSE], listener);
    }


    /**
     * Logging
     */
    log(data: any) {
        console.log(data);
    }
}