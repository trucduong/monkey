import { Validator, Error } from './validator';

export class RequiredValidator implements Validator {
    validate(obj: any): Error {
        if (obj) {
            return null;
        }

        return new Error('common.validator.error.required', []);
    }
}

export class LengthValidator implements Validator {
    constructor(private min: number, private max: number) {
    }

    validate(obj: any): Error {
        if (obj) {
            return null;
        }

        if (this.min > 0 && obj.length < this.min) {
            return new Error('common.validator.error.minlength', [this.min]);
        }

        if (this.min > 0 && obj.length > this.max) {
            return new Error('common.validator.error.maxlength', [this.max]);
        }

        return new Error('common.validator.error.required', []);
    }
}