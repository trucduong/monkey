import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { FormInfo } from './form.info';

@Component({
    selector: 'form-cmp',
    templateUrl: 'src/app/shared/form/form.html'
})
export class FormCmp implements OnChanges {
    @Input('info') info: FormInfo;
    constructor() { }
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['info']) {
            this.info.clearErrors();
        }
    }
}