import { CommonUtils, Validator, Error, RequiredValidator, LengthValidator, ComboboxService } from '../core/index';
import {TranslateService} from 'ng2-translate/ng2-translate';

export abstract class ValidatorHandler {
    private validators: Validator[];
    private errors: Error[];
    translate: TranslateService

    constructor(translate: TranslateService) {
        this.validators = [];
        this.errors = [];
        this.translate = translate;
    }

    translateErrors(errs: Error[]) {
        errs.forEach(err => {
            this.translate.get(err.name).toPromise()
                .then(msg => {
                    err.message = CommonUtils.formatStr(msg, err.params);
                }).catch(e => {
                    err.message = '';
                });
        });
    }

    public abstract validate(): boolean;

    public addValidator(validator: Validator) {
        this.validators.push(validator);
    }

    public getValidators(): Validator[] {
        return this.validators;
    }

    public removeValidators() {
        this.validators = [];
    }

    public addError(err: Error) {
        this.errors.push(err);
    }

    public clearErrors() {
        this.errors = [];
    }

    public hasError() {
        return this.errors.length > 0;
    }

    public getErrors(): Error[] {
        return this.errors;
    }
}

export class FormFieldInfo extends ValidatorHandler {
    label: string;
    name: string;
    model: any;

    required: boolean;
    enabled: boolean;
    //readonly: boolean; // not support
    visible: boolean;

    type: string;
    autofocus: boolean;
    placeholder: string;

    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean) {
        super(translate);

        this.model = model;
        this.name = name;
        this.label = label;

        this.required = required;
        if (this.required) {
            this.addValidator(new RequiredValidator());
        }
        this.enabled = true;
        this.visible = true;
        // this.type = '';
        this.autofocus = false;
        this.placeholder = '';
    }

    public validate(): boolean {
        let mthis = this;
        this.clearErrors();

        if (this.getValidators().length == 0) {
            return false;
        }

        this.getValidators().every(validator => {
            let err = validator.validate(mthis.model[this.name]);
            if (err) {
                mthis.addError(err);
                return false;
            }
            return true;
        });

        this.translateErrors(this.getErrors());
        return this.hasError();
    }
}

export class FormInfo extends ValidatorHandler {
    model: any; // form bean
    title: string;
    fields: Map<string, FormFieldInfo>;

    constructor(mtranslate: TranslateService, model: any, title: string, fields?: Map<string, FormFieldInfo>) {
        super(mtranslate);

        this.model = model;
        this.title = title;
        if (fields) {
            this.fields = fields;
        } else {
            this.fields = new Map<string, FormFieldInfo>();
        }
    }

    public addField(field: FormFieldInfo): FormFieldInfo {
        this.fields.set(field.name, field);
        return field;
    }

    public createField(name: string, title: string, required?: boolean): FormFieldInfo {
        return this.addField(new FormFieldInfo(this.translate, this.model, name, title, required));
    }

    public getField(name: string): FormFieldInfo {
        return this.fields.get(name);
    }

    public validate(): boolean {
        let mthis = this;
        this.clearErrors();

        // validate fields
        this.fields.forEach(field => {
            field.validate();
        });

        // validate form
        if (this.getValidators().length > 0) {
            this.getValidators().forEach(validator => {
                let err = validator.validate(mthis.model);
                if (err) {
                    mthis.addError(err);
                }
            });
        }

        this.translateErrors(this.getErrors());
        return this.hasError();
    }

    public hasError() {
        if (this.getErrors().length > 0) {
            return true;
        }

        let hasError = false;
        this.fields.forEach(field => {
            if (field.hasError()) {
                hasError = true;
            }
        });

        return hasError;
    }
}

export class TextFieldInfo extends FormFieldInfo {
    maxlength: number;
    minlength: number;

    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, minlength: number, maxlength: number) {
        super(translate, model, name, label, required);
        this.maxlength = maxlength;
        this.minlength = minlength;
        this.type = 'text';
        //this.addValidator(new LengthValidator(minlength, maxlength));
    }
}

export class EmailFieldInfo extends TextFieldInfo {
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, maxlength: number, minlength: number) {
        super(translate, model, name, label, required, maxlength, minlength);
        this.maxlength = maxlength;
        this.minlength = minlength;
        this.type = 'email';
    }
}

export class PasswordFieldInfo extends TextFieldInfo {
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, maxlength: number, minlength: number) {
        super(translate, model, name, label, required, maxlength, minlength);
        this.maxlength = maxlength;
        this.minlength = minlength;
        this.type = 'password';
    }
}

export class TextAreaFieldInfo extends TextFieldInfo {
    maxlength: number;
    rows: number;
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, maxlength: number, rows: number) {
        super(translate, model, name, label, required, maxlength, 0);
        this.rows = rows
        this.type = 'textarea';
    }
}

export class NumberFieldInfo extends FormFieldInfo {
    max: number;
    min: number;
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, max: number, min: number) {
        super(translate, model, name, label, required);
        this.max = max;
        this.min = min;
        this.type = 'number';
    }
}

export class DateFieldInfo extends FormFieldInfo {
    max: Date;
    min: Date;
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, max: Date, min: Date) {
        super(translate, model, name, label, required);
        this.max = max;
        this.min = min;
        this.type = 'date';
    }
}

export class DateTimeFieldInfo extends FormFieldInfo {
    max: Date;
    min: Date;
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, max: Date, min: Date) {
        super(translate, model, name, label, required);
        this.max = max;
        this.min = min;
        this.type = 'datetime';
    }
}


export class TimeFieldInfo extends FormFieldInfo {
    max: Date;
    min: Date;
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean, max: Date, min: Date) {
        super(translate, model, name, label, required);
        this.max = max;
        this.min = min;
        this.type = 'time';
    }
}

export class CheckboxFieldInfo extends FormFieldInfo {
    items: { value: string, label: string, checked: boolean }[];
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean) {
        super(translate, model, name, label, required);
        this.items = [];
        this.type = 'checkbox';
    }

    update(values: string[]) {
        this.items.forEach(item => {
            if (values && values.includes(item.value)) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });
    }

    addItem(label: string, value: string): CheckboxFieldInfo {
        this.items.push({ value: value, label: label, checked: false })
        return this;
    }

    select(value: string) {
        this.items.forEach(item => {
            if (item.value == value) {
                item.checked = true;
            }
        });
    }

    selectChange(value: string, checked: boolean) {
        this.items.forEach(item => {
            if (item.value == value) {
                item.checked = checked;
            }
        });
    }

    deSelect(value: string) {
        this.items.forEach(item => {
            if (item.value == value) {
                item.checked = false;
            }
        });
    }

    getSelectedValues(): string[] {
        let values: string[] = [];
        this.items.forEach(item => {
            if (item.checked) {
                values.push(item.value);
            }
        });
        return values;
    }
}

export class RadioFieldInfo extends FormFieldInfo {
    items: { value: string, label: string, checked: boolean }[];
    constructor(translate: TranslateService, model: any, name: string, label: string, required: boolean) {
        super(translate, model, name, label, required);
        this.items = [];
        this.type = 'radio';
    }

    update(value: string) {
        this.items.forEach(item => {
            if (value && value == item.value) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });
    }

    addItem(label: string, value: string): RadioFieldInfo {
        this.items.push({ value: value, label: label, checked: false })
        return this;
    }

    select(value: string) {
        this.items.forEach(item => {
            if (item.value == value) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });
    }

    selectChange(value: string, checked: boolean) {
        this.items.forEach(item => {
            if (item.value == value) {
                item.checked = checked;
            } else {
                item.checked = false;
            }
        });
    }

    deSelect(value: string) {
        this.items.forEach(item => {
            if (item.value == value) {
                item.checked = false;
            } else {
                item.checked = false;
            }
        });
    }

    getSelectedValues(): string {
        let value: string = null;
        this.items.forEach(item => {
            if (item.checked) {
                value = item.value;
            }
        });
        return value;
    }
}

export class CmbFieldInfo extends FormFieldInfo {
    service: ComboboxService;
    filter: any;
    hasBlankItem: boolean;
    items: {value: string, label: string}[];
    
    constructor(translate: TranslateService, service: ComboboxService, model: any, name: string, label: string, required: boolean, hasBlankItem?: boolean) {
        super(translate, model, name, label, required);
        this.service = service;
        if (hasBlankItem == false) {
            this.hasBlankItem = false;
        } else {
            this.hasBlankItem = true;
        }
    }

    getLable(item): string {
        return this.service.getLabel(item);
    }

    getValue(item): string {
        return this.service.getValue(item);
    }
}

export class UploadFieldInfo extends FormFieldInfo {

}

export class ImageFieldInfo extends FormFieldInfo {

}