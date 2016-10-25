import { Error } from './error';

export interface Validator {
    validate(obj: any): string;
}