import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { FormInfo } from './form.info';
import { Error, CommonUtils } from '../core/index';

@Component({
    selector: 'form-cmp',
    templateUrl: 'src/app/shared/form/form.html'
})
export class FormCmp implements OnChanges {
    @Input('info') info: FormInfo;
    constructor(private translate: TranslateService) { }
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['info']) {
            this.info.clearErrors();
        }
    }
}