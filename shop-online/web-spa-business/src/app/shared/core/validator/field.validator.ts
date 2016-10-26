import { Validator } from './validator';

export class RequiredValidator implements Validator {
    validate(obj: any): string {
        if (obj) {
            return null;
        }

        return 'common.validator.error.required';
    }
}

export class RangeValidator implements Validator {
    constructor(private min: number, private max: number) {
    }

    validate(obj: any): string {
        if (obj) {
            return null;
        }

        return 'common.validator.error.required';
    }
}