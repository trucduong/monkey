export class AlertInfo {
    type: String;
    message: String;
    param: any

    constructor(type: String, message: String, param?: any) {
        this.type = type;
        this.message = message;
        if (param) {
            this.param = param;
        } else {
            this.param = {};
        }
    }
}