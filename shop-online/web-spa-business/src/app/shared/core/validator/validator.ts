export class Error {
    name: string;
    params: any[];
    description: string;
    constructor (name: string, params: any[], description?: string) {
        this.name = name;
        this.params = params;
        this.description = description;
    }
}

export interface Validator {
    validate(obj: any): Error;
}