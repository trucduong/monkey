export class Error {
    name: string;
    error: string;
    description: string;
    constructor (name: string, error: string, description?: string) {
        this.name = name;
        this.error = error;
        this.description = description;
    }
}