export class DialogInfo {
    isShow: boolean;
    closeable: boolean;

    constructor() {
        this.isShow = false;
        this.closeable = true;
    }

    getDisplayStyle(): string {
        return this.isShow ? 'block' : 'none';
    }
}