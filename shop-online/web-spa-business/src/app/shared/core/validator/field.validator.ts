import { Validator } from './validator';

export class RequiredValidator implements Validator {
    validate(obj: any): string {
        if (obj) {
            return null;
        }

        return 'common.validator.error.required';
    }
}