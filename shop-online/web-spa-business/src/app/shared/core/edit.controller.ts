import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { BaseController } from './base.controller';
import { AlertType } from '../alert/alert.type';
import { FormInfo } from '../form/form.info';

/**
 * EditController
 */
export abstract class EditController<T> extends BaseController {
    constructor(private route: ActivatedRoute, router: Router, translate: TranslateService) {
        super(router, translate);
    }

    idColumnName='id';
    formInfo: FormInfo;
    isEditing: boolean;

    //abstract load(id: any): Promise<T>;
    //abstract createForm(): FormInfo;
    //abstract save(model: T): Promise<T>;

    // TODO: remove this
    createForm(): FormInfo {return new FormInfo(null, null, null)}
    save(model: T): Promise<T> {return Promise.resolve({})}
    load(id: any): Promise<T> {
        return Promise.resolve(null);
    }

    ngOnInit() {
        this.showLoading();

        this.formInfo = this.createForm();
        this.formInfo.model[this.idColumnName] = '-1';

        this.isEditing = false;
        this.route.params.forEach((params: any) => {
            let id = params[this.idColumnName] + '';
            if (id && id != '-1') {
                this.load(id).then(data => {
                    this.formInfo.model = data;
                    this.isEditing = true;
                }).catch(err => {
                    //this.formInfo.model = {};
                    this.log(err);
                });
            }
        });

        this.hideLoading();
    }

    onSave() {
        this.showLoading();

        // validate
        if (!this.formInfo.validate({})) {
            this.showErrorMessage({key:"common.validator.error", params: []});
            return;
        }

        // save
        this.save(this.formInfo.model)
        .then(item => {
            this.formInfo.model = item;
            this.onBack();
            this.hideLoading();
        })
        .catch(error => {
            this.showErrorMessage({key: "common.error.save", params: []});
            this.log(error);
            this.hideLoading();
        });
    }
}