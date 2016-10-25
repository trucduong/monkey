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
    private errors: { [key:string]:string; } = {};

    // TODO: change to abstract method
    createForm(): FormInfo {return new FormInfo(null, null)}
    abstract load(id: any): T;
    abstract save(model: T): boolean;

    ngOnInit() {
        this.showLoading();

        this.formInfo = this.createForm();

        this.route.params.forEach((params: any) => {
            let id = params[this.idColumnName] + '';
            if (id == null || id == '' || id == '-1') {
                this.isEditing = false;
            } else {
                this.formInfo.model = this.load(id);
                this.isEditing = true;
            }
        });

        this.hideLoading();
    }

    onSave() {
        this.showLoading();

        // validate
        if (!this.formInfo.validate()) {
            this.showErrorMessage("Please input correct information!");
        }

        // save
        let result = this.save(this.formInfo.model);
        if (!result) {
            this.showErrorMessage("Can not save");
            return;
        }

        this.hideLoading();
        this.onBack();
    }

    addError(field: string, message: string) {
        this.errors[field] = message;
    }
}