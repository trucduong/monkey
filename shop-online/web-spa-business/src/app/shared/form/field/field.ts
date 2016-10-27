import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { FormFieldInfo } from '../form.info';
import { Error } from '../../core/index';


@Component({
    selector: 'form-field-cmp',
    templateUrl: 'src/app/shared/form/field/field.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class FormFieldCmp implements OnChanges {
    @Input('info') info: FormFieldInfo;
    @Input('fieldModel') fieldModel: any;

    constructor(private translate: TranslateService) { }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['info']) {
            if (this.info) {
                this.info.clearErrors();
            }
        } else if (changes['fieldModel']) {
            if (this.info) {
                this.info.validate();
            }
        }
    }

    getErorrMessage(err: Error): Promise<string> {
        return this.translate.get(err.name, err.params).toPromise();
    }
}