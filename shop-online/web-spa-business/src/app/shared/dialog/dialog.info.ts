export class DialogInfo {
    isShow: boolean;
    closeable: boolean;
    title: string;

    constructor() {
        this.isShow = false;
        this.title = '';
        this.closeable = true;
    }

    getDisplayStyle(): string {
        return this.isShow ? 'block' : 'none';
    }

    hasHeader(): boolean {
        return true;
    }

    hasFooter(): boolean {
        return true;
    }
}