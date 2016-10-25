import { Validator, RequiredValidator } from '../core/index';

export class FormFieldInfo {
    label: string;
    name: string;
    model: any;

    required: boolean;
    enabled: boolean;
    //readonly: boolean; // not support
    visible: boolean;

    validators: Validator[];
    private errors: string[];

    constructor(model: any, name: string, label: string, required: boolean) {
        this.validators = [];
        this.errors = [];

        this.model = model;
        this.name = name;
        this.label = label;

        this.required = required;
        if (this.required) {
            this.validators.push(new RequiredValidator());
        }
        this.enabled = true;
        this.visible = true;
    }

    public validate(): boolean {
        let mthis = this;
        this.clearErrors();

        if (!this.validators || this.validators.length == 0) {
            return false;
        }

        this.validators.every(validator => {
            let err = validator.validate(mthis.model[this.name]);
            if (err) {
                mthis.addError(err);
                return true;
            }
        });

        return this.hasError();
    }

    public addError(err: string) {
        this.errors.push(err);
    }

    public clearErrors() {
        this.errors = [];
    }

    public hasError() {
        return this.errors.length > 0;
    }
}

export class FormInfo {
    model: any; // form bean
    title: string;
    fields: Map<string, FormFieldInfo>;
    validators: Validator[];
    private errors: string[];

    constructor(model: any, title: string, fields?: Map<string, FormFieldInfo>) {
        this.validators = []
        this.errors = []

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
        return this.addField(new FormFieldInfo(this.model, name, title, required));
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
        if (this.validators || this.validators.length > 0) {
            this.validators.forEach(validator => {
                let err = validator.validate(mthis.model);
                if (err) {
                    mthis.addError(err);
                }
            });
        }

        return this.hasError();
    }

    public addError(err: string) {
        this.errors.push(err);
    }

    public clearErrors() {
        this.errors = [];
    }

    public hasError() {
        if (this.errors.length > 0) {
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