import { Component, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { Error, CommonUtils, FormFieldInfo, TextFieldInfo, CheckboxFieldInfo, CmbFieldInfo, SmartCmbFieldInfo, ValueChangeEvent } from '../../core/index';

export class CustomField {
    @Input('info') info: FormFieldInfo;
    @Input('fieldModel') fieldModel: any;
    @Output() fieldModelChange: any = new EventEmitter();

    updateData(event, data?: any) {
        let oldValue = this.fieldModel;
        this.fieldModel = event;
        if (this.info) {
            this.info.validate(this.fieldModel);
        }
        this.fieldModelChange.emit(event);

        this.info.fireValueChangeListener(new ValueChangeEvent(oldValue, event, data));
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
    selector: 'textarea-field-cmp',
    templateUrl: 'src/app/shared/form/field/textarea.html',
    styleUrls: ['src/app/shared/form/field/field.css']
})
export class TextAreaFieldCmp extends CustomField {
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
        if (this.info) {
            this.info.validate(this.fieldModel);
        }
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

                let mInfo = (<CmbFieldInfo>this.info);
                mInfo.service.getItems(mInfo.filter)
                    .then(data => {
                        mInfo.items = data;
                    });
            }
        }

        //(<CheckboxFieldInfo>this.info).update(this.fieldModel);
    }

    updateData(event, data?: any) {
        console.log(data);
        super.updateData(event, data);
        // let oldValue = this.fieldModel;
        // this.fieldModel = event;
        // if (this.info) {
        //     this.info.validate(this.fieldModel);
        // }
        // this.fieldModelChange.emit(event);

        // this.info.fireValueChangeListener(new ValueChangeEvent(oldValue, event, data));
    }
}

@Component({
    selector: 'smartcmb-field-cmp',
    templateUrl: 'src/app/shared/form/field/smartcombobox.html',
    styleUrls: ['src/app/shared/form/field/field.css',
        'src/app/shared/form/field/smartcombobox.css',]
})
export class SmartCmbFieldCmp extends CustomField implements OnChanges {
    dataSources: any[];
    filteredList: any[];
    searchText: string;
    oldSearchText: string;

    selectionChanged: boolean = false;

    constructor() {
        super();
        this.dataSources = [];
        this.filteredList = [];
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let mthis = this;

        if (changes['info']) {
            if (mthis.info) {
                mthis.info.clearErrors();

                let mInfo = (<SmartCmbFieldInfo>mthis.info);
                mInfo.service.getItems({})
                    .then(data => {
                        mthis.dataSources = data;
                        mthis.updateSearchText();
                    })
                    .catch(err => {
                        mthis.dataSources = [];
                        mthis.updateSearchText();
                    });
            }
        }

        if (!mthis.selectionChanged) {
            mthis.updateSearchText();
            //mthis.filter();
        }
        mthis.selectionChanged = false;
    }

    onFilter(event: KeyboardEvent) {
        if (event.key == 'Escape') {
            this.filteredList = [];
            this.updateSearchText();
        } else if (this.oldSearchText != this.searchText) {
            this.filter();
            this.oldSearchText = this.searchText;
        }
    }

    filter() {
        let mthis = this;
        let cmbInfo = <SmartCmbFieldInfo>mthis.info;

        mthis.filteredList = mthis.dataSources.filter(item => {
            return cmbInfo.getLabel(item).toLowerCase().indexOf(mthis.searchText) > -1;
        });
    }

    showAll() {
        if (this.filteredList.length > 0) {
            this.filteredList = [];
        } else {
            this.filteredList = this.dataSources;
        }
    }

    updateSearchText() {
        let mthis = this;
        let cmbInfo = <SmartCmbFieldInfo>mthis.info;

        if (cmbInfo.useLabelAsValue) {
            mthis.oldSearchText = mthis.searchText;
            mthis.searchText = mthis.fieldModel;
        } else {
            mthis.dataSources.forEach(item => {
                if (cmbInfo.getValue(item) == mthis.fieldModel) {
                    mthis.oldSearchText = mthis.searchText;
                    mthis.searchText = cmbInfo.getLabel(item);
                }
            });
        }
    }

    select(item: any) {
        let mthis = this;
        let cmbInfo = <SmartCmbFieldInfo>mthis.info;

        mthis.oldSearchText = mthis.searchText;
        mthis.searchText = cmbInfo.getLabel(item);
        mthis.selectionChanged = true;
        let newValue = cmbInfo.getValue(item)
        mthis.updateData(newValue, item);
        mthis.filteredList = [];
    }
}
