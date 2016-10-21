import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { BaseController } from './base.controller';
import { AlertType } from '../alert/alert.type';

/**
 * EditController
 */
export abstract class EditController<T> extends BaseController {
    constructor(private route: ActivatedRoute, router: Router, translate: TranslateService) {
        super(router, translate);
    }

    idColumnName='id';
    private model: T;
    isEditing: boolean;
    private errors: { [key:string]:string; } = {};

    abstract createModel(): T;
    abstract load(id: any): T;
    abstract validate(model: T): boolean;
    abstract save(model: T): boolean;

    ngOnInit() {
        this.showLoading();

        this.errors = {};

        this.route.params.forEach((params: any) => {
            let id = params[this.idColumnName] + '';
            if (id == null || id == '' || id == '-1') {
                this.model = this.createModel();
                this.isEditing = false;
            } else {
                this.model = this.load(id);
                this.isEditing = true;
            }
        });

        this.hideLoading();
    }

    onSave() {
        this.showLoading();

        // validate
        this.errors = {};
        if (!this.validate(this.model)) {
            this.alert(AlertType.danger, "Please input correct information!");
        }

        // save
        let result = this.save(this.model);

        if (!result) {
            this.alert(AlertType.danger, "Can not save");
            this.hideLoading();
            return;
        }

        this.hideLoading();
        this.onBack();
    }

    addError(field: string, message: string) {
        this.errors[field] = message;
    }
}