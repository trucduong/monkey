import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { FormFieldInfo } from '../form.info';

@Component({
    selector: 'form-field-cmp',
    templateUrl: 'src/app/shared/form/field/field.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class FormFieldCmp implements OnChanges {
    @Input('info') info: FormFieldInfo;
    @Input('fieldModel') fieldModel: any;

    constructor() { }

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
}