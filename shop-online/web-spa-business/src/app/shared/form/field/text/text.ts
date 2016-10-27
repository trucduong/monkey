import { Component, OnInit } from '@angular/core';
import { FormFieldCmp } from '../field';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'text-field-cmp',
    templateUrl: 'src/app/shared/form/field/text/text.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class TextFieldCmp extends FormFieldCmp implements OnInit {
    constructor(translate: TranslateService) { 
        super(translate);
    }

    ngOnInit() { }
}