import { Component, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { FormFieldInfo, TextFieldInfo, CheckboxFieldInfo, CmbFieldInfo } from '../form.info';
import { Error, CommonUtils } from '../../core/index';

export class CustomField {
    @Input('info') info: FormFieldInfo;
    @Input('fieldModel') fieldModel: any;
    @Output() fieldModelChange: any = new EventEmitter();

    updateData(event) {
        this.fieldModel = event;
        this.fieldModelChange.emit(event);
    }
}


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
                this.info.validate(this.fieldModel);
            }
        }
    }
}

@Component({
    selector: 'text-field-cmp',
    templateUrl: 'src/app/shared/form/field/text.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class TextFieldCmp extends CustomField {
}

@Component({
    selector: 'number-field-cmp',
    templateUrl: 'src/app/shared/form/field/number.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class NumberFieldCmp extends CustomField {
}

/**
 * use for date, time, datetime
 */
@Component({
    selector: 'date-field-cmp',
    templateUrl: 'src/app/shared/form/field/date.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class DateFieldCmp extends CustomField {
}

@Component({
    selector: 'checkbox-field-cmp',
    templateUrl: 'src/app/shared/form/field/checkbox.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class CheckboxFieldCmp extends CustomField implements OnChanges {
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['info']) {
            if (this.info) {
                this.info.clearErrors();
            }
        } else if (changes['fieldModel']) {
            if (this.info) {
                this.info.validate(this.fieldModel);
            }
        }

        (<CheckboxFieldInfo>this.info).update(this.fieldModel);
    }
    updateSelection(item, event) {
        if (!event.target) {
            return;
        }

        let mInfo = (<CheckboxFieldInfo>this.info);
        mInfo.selectChange(item, event.target.checked);

        this.fieldModel = mInfo.getSelectedValues();
        this.fieldModelChange.emit(this.fieldModel);
    }
}

@Component({
    selector: 'radio-field-cmp',
    templateUrl: 'src/app/shared/form/field/radio.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class RadioFieldCmp extends CheckboxFieldCmp {
}


@Component({
    selector: 'cmb-field-cmp',
    templateUrl: 'src/app/shared/form/field/combobox.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class CmbFieldCmp extends CustomField implements OnChanges {
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['info']) {
            if (this.info) {
                this.info.clearErrors();

                let mInfo = (<CmbFieldInfo> this.info);
                mInfo.service.getItems(mInfo.filter)
                    .then(data => {
                        mInfo.items = data;
                    });
            }
        } else if (changes['fieldModel']) {
            if (this.info) {
                this.info.validate(this.fieldModel);
            }
        }

        //(<CheckboxFieldInfo>this.info).update(this.fieldModel);
    }
}