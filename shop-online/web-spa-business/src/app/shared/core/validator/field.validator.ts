import { Validator, Error } from './validator';

export class RequiredValidator implements Validator {
    validate(obj: any): Error {
        if (obj == null || obj == 'undefined' || obj == '' || obj.length == 0) {
            return new Error('common.validator.error.required', []);
        }

        return null;
    }
}

export class LengthValidator implements Validator {
    constructor(private min: number, private max: number) {
    }

    validate(obj: any): Error {
        if (!obj) {
            return null;
        }

        if (this.min > 0 && obj.length < this.min) {
            return new Error('common.validator.error.minlength', [this.min]);
        }

        if (this.max > 0 && obj.length > this.max) {
            return new Error('common.validator.error.maxlength', [this.max]);
        }

        return null;
    }
}

export class NumberValidator implements Validator {
    constructor(private min: number, private max: number) {
    }

    validate(obj: any): Error {
        if (!obj) {
            return null;
        }

        if (this.min != null && obj < this.min) {
            return new Error('common.validator.error.minvalue', [this.min]);
        }

        if (this.max != null && obj > this.max) {
            return new Error('common.validator.error.maxvalue', [this.max]);
        }

        return null;
    }
}

export class DateValidator implements Validator {
    constructor(private min: Date, private max: Date) {
    }

    validate(obj: any): Error {
        if (!obj) {
            return null;
        }

        if (this.min && obj < this.min) {
            return new Error('common.validator.error.mindate', [this.min]);
        }

        if (this.max && obj > this.max) {
            return new Error('common.validator.error.maxdate', [this.max]);
        }

        return null;
    }
}