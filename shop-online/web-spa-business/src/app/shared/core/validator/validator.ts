import {TranslateService} from 'ng2-translate/ng2-translate';
export class Error {
    name: string;
    params: any[];
    message: string;
    private translate: TranslateService;
    constructor (name: string, params: any[]) {
        this.name = name;
        this.params = params;
    }
}

export interface Validator {
    validate(obj: any): Error;
}